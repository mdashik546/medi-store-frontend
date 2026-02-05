"use server";
import { env } from "@/env";
import { cookies } from "next/headers";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetcherOption {
  method?: Method;
  body?: any;
  headers?: HeadersInit;
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
}

export const fetcher = async (
  endPoint: string,
  options: FetcherOption = {},
) => {
  const { method = "GET", body, headers, cache, revalidate,tags } = options;

  try {
    const cookieStore = await cookies();
    const res = await fetch(`${env.API_BASE_URL}${endPoint}`, {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...headers,
        Cookie: cookieStore.toString(),
      },
      body: body ? JSON.stringify(body) : undefined,
      cache,
      next: revalidate || tags ? { revalidate, tags } : undefined,
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log("API Error:", errorData.message);
      throw new Error(errorData.message);
    }

    return await res.json();
  } catch (error) {
    console.error("Fetcher Error:", error);
    throw error;
  }
};
