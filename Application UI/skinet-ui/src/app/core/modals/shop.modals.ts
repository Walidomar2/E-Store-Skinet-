import { PaginationParams } from "./general.modals";

export interface ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type: string;
  brand?: string;
  quantityInStock: number;
}

export interface GetAllProductsDto extends PaginationParams {
  filterText?: string | null;
  brands?: string[];
  types?: string[];
}