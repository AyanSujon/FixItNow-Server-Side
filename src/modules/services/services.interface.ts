import { PriceType } from "../../../generated/prisma/enums";

export interface IService {
  categoryId: string;
  title: string;
  description: string;
  price: number;
  priceType?: PriceType;
  estimatedDuration?: number;
  thumbnail?: string;
  isAvailable?: boolean;
}




export interface IServiceQuery {
  searchTerm?: string;

  categoryId?: string;
  technicianId?: string;

  priceType?: PriceType;

  minPrice?: string;
  maxPrice?: string;

  minRating?: string;

  isAvailable?: string;
  address?: string
  city?: string
  district?: string

  page?: string;
  limit?: string;

  sortBy?: "price" | "averageRating" | "createdAt";
  sortOrder?: "asc" | "desc";
}