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

    if (params.brands?.length) {
      params.brands.forEach(brand => {
        httpParams = httpParams.append('brands', brand);
      });
    }

    if (params.types?.length) {
      params.types.forEach(type => {
        httpParams = httpParams.append('types', type);
      });
    }

    if (params.skipCount) httpParams = httpParams.set('skipCount', params.skipCount);
    if (params.maxResultCount) httpParams = httpParams.set('maxResultCount', params.maxResultCount);
    if (params.sorting) httpParams = httpParams.set('sorting', params.sorting);

    return this.http.get<PagedResultDto<ProductDto>>(this.baseUrl + "products", { params: httpParams });
  }

  getProductById(id: string) {
    return this.http.get<ProductDto>(this.baseUrl + "products/" + id);
  }

  getBrands() {
    return this.http.get<string[]>(this.baseUrl + "products/brands");
  }

  getTypes() {
    return this.http.get<string[]>(this.baseUrl + "products/types");
  }
}
