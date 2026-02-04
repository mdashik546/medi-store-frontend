export type Medicine = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  expiryDate: string;
  imageURL: string | null;
  slug: string | null;
  categoryId: string | null;
  companyId: string;
  sellerId: string;
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  createdAt: string;
  updatedAt: string;
};
