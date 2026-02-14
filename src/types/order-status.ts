export const orderStatus = ["PROCESSING", "SHIPPED", "DELIVERED","CANCELLED","PLACED"] as const;

export type OrderStatus = (typeof orderStatus)[number];
