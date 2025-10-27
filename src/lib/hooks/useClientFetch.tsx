"use client";
import { useCallback, useEffect, useState, useRef } from "react";

type AsyncAction<T> = () => Promise<T>;

interface UseClientFetchOptions<T> {
  action: AsyncAction<T>;
  autoFetch?: boolean; // if true, will fetch when modal opens
  isModalOpen?: boolean; // if true,
}

export const useClientFetch = <T,>({
  action,
  autoFetch = true,
  isModalOpen,
}: UseClientFetchOptions<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  const actionRef = useRef<AsyncAction<T>>(action);
  actionRef.current = action;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await Promise.resolve(actionRef.current());

      if ((response as any)?.data) {
        setData((response as any)?.data);
      } else {
        setData(response);
      }
    } catch {
      setError("Failed to load data");
    } finally {
      setIsLoading(false);
      setHasFetched(true);
    }
  }, []);

  const retry = useCallback(() => {
    setHasFetched(false); // allow re-fetch on retry
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (autoFetch && isModalOpen && !hasFetched) {
      console.log({ hasFetched, data });
      fetchData();
    }
  }, [isModalOpen, autoFetch, hasFetched, fetchData]);

  return {
    data,
    isLoading,
    error,
    retry,
  };
};
