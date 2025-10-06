"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import { useModal } from "./useModal"; // Assuming this is your custom hook

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
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const retry = () => {
    fetchData();
  };

  useEffect(() => {
    if (
      autoFetch &&
      isModalOpen &&
      (data === null || (Array.isArray(data) && data.length === 0))
    ) {
      fetchData();
    }
  }, [isModalOpen, autoFetch, data, fetchData]);

  return {
    data,
    isLoading,
    error,
    retry,
  };
};
