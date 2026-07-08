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

