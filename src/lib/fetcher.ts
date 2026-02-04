"use server";
import { env } from "@/env";
type Method = "GET" | "POST" | "UPDATE" | "DELETE";

interface FetcherOption {
  method?: Method;
  body?: any;
  headers?: HeadersInit;
  cache?: RequestCache;
  revalidate?: number;
}
export const fetcher = async (
  endPoint: string,
  options: FetcherOption = {},
) => {
  try {
    const { method = "GET", body, headers, cache, revalidate } = options;

    const res = await fetch(`${env.API_BASE_URL}/${endPoint}`, {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },

      body: body ? JSON.stringify(body) : undefined,
      cache,
      next: revalidate ? { revalidate } : undefined,
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
};
