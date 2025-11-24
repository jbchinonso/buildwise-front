"use client";
import { useCallback, useEffect, useState, useRef } from "react";

type AsyncAction<T> = () => Promise<T>;

interface UseClientFetchOptions<T> {
  action: AsyncAction<T>;
  autoFetch?: boolean;
  isModalOpen?: boolean;
}

export const useClientFetch = <T,>({
  action,
  autoFetch = true,
  isModalOpen,
}: UseClientFetchOptions<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const actionRef = useRef(action);
  actionRef.current = action;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (data) return data;
      const response = await Promise.resolve(actionRef.current());
      if ((response as any)?.error) {
        throw (response as any)?.error;
      }
      setData(response);
    } catch {
      setError("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const retry = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (autoFetch && isModalOpen) {
      fetchData();
    }
  }, [isModalOpen, autoFetch, fetchData]);

  return { data, isLoading, error, retry };
};
