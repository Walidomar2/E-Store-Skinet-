import { Component } from '@angular/core';
import { ProductDto } from '../../../core/modals/shop.modals';
import { ShopService } from '../../../core/services/shop/shop.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../core/services/language/language.service';
import { TranslatePipe } from "../../../core/services/language/translation.service";

@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe,
    MatIcon,
    TranslatePipe
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  product: ProductDto | null = null;
  quantity = 1;
  quantityInCart = 1;
  discount: number = 0;
  originalPrice: number = 0;
  private langSub?: Subscription;
  productId: string | null = null;

  constructor(private readonly shopService: ShopService,
    private readonly route: ActivatedRoute,
    private readonly languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      if (this.productId) {
        this.loadProductDetails(this.productId);
      }
    });

    this.langSub = this.languageService.language$.subscribe(() => {
      this.loadProductDetails(this.productId!);
    });

    this.languageService.applySavedLanguage();
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  private loadProductDetails(productId: string): void {
    this.shopService.getProductById(productId).subscribe({
      next: (response) => {
        this.product = response;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      }
    });
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  updateCart() {

  }

  getButtonText() {
    return this.quantityInCart > 0 ? 'product.updateCart' : 'product.addToCart';
  }

}
