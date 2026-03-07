import { PaginationParams } from "./general.modals";

export interface ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type: string;
  brand?: string | null;
  quantityInStock: number;
}

export interface GetAllProductsDto extends PaginationParams {
  filterText?: string | null;
  brands?: string[] | null;
  types?: string[] | null;
}