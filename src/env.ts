// src/env.ts
import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    API_BASE_URL: z.url(),
    BETTER_AUTH_URL: z.url(),
  },

  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string(),
  },

  runtimeEnv: {
    API_BASE_URL: process.env.API_BASE_URL,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
});
