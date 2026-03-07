import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedResultDto } from '../../modals/general.modals';
import { GetAllProductsDto, ProductDto } from '../../modals/shop.modals';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = "http://localhost:5209/api/";

  constructor(private http: HttpClient) { }

  getProducts(params: GetAllProductsDto) {
    let httpParams = new HttpParams();
    if (params.filterText) httpParams = httpParams.set('filterText', params.filterText);
    if (params.brands) httpParams = httpParams.set('brands', params.brands.join(','));
    if (params.types) httpParams = httpParams.set('types', params.types.join(','));
    if (params.skipCount) httpParams = httpParams.set('pageNumber', params.skipCount);
    if (params.maxResultCount) httpParams = httpParams.set('pageSize', params.maxResultCount);
    if (params.sorting) httpParams = httpParams.set('sorting', params.sorting);

    return this.http.get<PagedResultDto<ProductDto>>(this.baseUrl + "products", { params: httpParams });
  }

  getProduct(id: number) {
    return this.http.get<ProductDto>(this.baseUrl + "products/" + id);
  }
}
