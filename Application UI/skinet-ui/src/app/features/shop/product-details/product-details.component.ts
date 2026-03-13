import { Component } from '@angular/core';
import { ProductDto } from '../../../core/modals/shop.modals';
import { ShopService } from '../../../core/services/shop/shop.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../core/services/language/language.service';

@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe,
    MatDividerModule,
    MatIcon,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  isLoading = false;
  product: ProductDto | null = null;
  quantity = 1;
  quantityInCart = 1;
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

  private loadProductDetails(productId: string): void {
    this.isLoading = true;
    this.shopService.getProductById(productId).subscribe({
      next: (response) => {
        this.product = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
        this.isLoading = false;
      }
    });
  }

  updateCart() {

  }

  getButtonText() {
    return this.quantityInCart > 0 ? 'Update Cart' : 'Add to Cart';
  }

}
