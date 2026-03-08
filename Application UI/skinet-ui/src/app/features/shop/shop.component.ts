import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GetAllProductsDto, ProductDto } from '../../core/modals/shop.modals';
import { PagedResultDto } from '../../core/modals/general.modals';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../core/services/language/language.service';
import { ShopService } from '../../core/services/shop/shop.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductItemComponent } from "./product-item/product-item.component";
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from "../../core/services/language/translation.service";

@Component({
  selector: 'app-shop',
  imports: [
    MatProgressSpinnerModule,
    ProductItemComponent,
    MatButton,
    MatIcon,
    TranslatePipe
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
  brands: string[] = [];
  types: string[] = [];

  constructor(private shopService: ShopService,
    private languageService: LanguageService,
    private dialogService: MatDialog) { }

  ngOnInit() {
    this.languageService.applySavedLanguage();
    this.initailizeData();

    this.langSub = this.languageService.language$.subscribe(() => {
      this.initailizeData();
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  loadProducts(): void {
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

  getBrands() {
    this.isLoading = true;
    this.shopService.getBrands().subscribe({
      next: (response) => {
        this.brands = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching brands:', error);
        this.isLoading = false;
      }
    });
  }

  getTypes() {
    this.isLoading = true;
    this.shopService.getTypes().subscribe({
      next: (response) => {
        this.types = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching types:', error);
        this.isLoading = false;
      }
    });
  }

  initailizeData() {
    this.loadProducts();
    this.getBrands();
    this.getTypes();
  }

  openFilterDialog() {
    const dialogRef = this.dialogService.open(FiltersDialogComponent, {
      minWidth: '500px',
    });
  }

}
