import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GetAllProductsDto, ProductDto } from '../../core/modals/shop.modals';
import { PagedResultDto } from '../../core/modals/general.modals';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../core/services/language/language.service';
import { ShopService } from '../../core/services/shop/shop.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductItemComponent } from "./product-item/product-item.component";

@Component({
  selector: 'app-shop',
  imports: [
    MatProgressSpinnerModule,
    ProductItemComponent
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit, OnDestroy {
  data: PagedResultDto<ProductDto> | null = null;
  products: ProductDto[] = [];
  isLoading = false;
  private langSub?: Subscription;
  filters = {} as GetAllProductsDto;

  constructor(private shopService: ShopService,
    private languageService: LanguageService) { }

  ngOnInit() {
    this.languageService.applySavedLanguage();
    this.fetchProducts();

    this.langSub = this.languageService.language$.subscribe(() => {
      this.fetchProducts();
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  private fetchProducts(): void {
    this.isLoading = true;
    this.shopService.getProducts(this.filters).subscribe({
      next: (response) => {
        this.data = response;
        this.products = response.items;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
      complete: () => { this.isLoading = false; }
    });
  }
}
