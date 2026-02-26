import { z } from "zod";

export const medicineSchema = z.object({
  categoryName: z.string().optional(),
  name: z.string().min(2, "Medicine name required"),
  price: z.number().min(1),
  stock: z.number().min(1),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .or(z.literal(""))
    .optional(),
  expiryDate: z.string().min(1, "Expiry date is required"),
  imageURL: z.string().optional(),
});
