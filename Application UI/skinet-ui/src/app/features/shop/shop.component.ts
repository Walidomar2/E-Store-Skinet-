import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GetAllProductsDto, ProductDto } from '../../core/modals/shop.modals';
import { PagedResultDto } from '../../core/modals/general.modals';
import { finalize, Subscription } from 'rxjs';
import { LanguageService } from '../../core/services/language/language.service';
import { ShopService } from '../../core/services/shop/shop.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductItemComponent } from "./product-item/product-item.component";
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from "../../core/services/language/translation.service";
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatListOption, MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-shop',
  imports: [
    MatProgressSpinnerModule,
    ProductItemComponent,
    MatButton,
    MatIcon,
    TranslatePipe,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger
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
  selectedBrands: string[] = [];
  selectedTypes: string[] = [];
  sortingOptions = [
    { value: 'price_asc', name: 'product.priceLowToHigh' },
    { value: 'price_desc', name: 'product.priceHighToLow' }
  ];
  selectedSort = 'price_asc';

  constructor(private shopService: ShopService,
    private languageService: LanguageService,
    private dialogService: MatDialog) { }

  ngOnInit() {
    this.languageService.applySavedLanguage();

    this.langSub = this.languageService.language$.subscribe(() => {
      this.initailizeData();
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.shopService.getProducts(this.filters)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response) => {
          this.data = response;
          this.products = response.items;
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        }
      });
  }

  initailizeData() {
    this.loadProducts();
  }

  openFilterDialog() {
    const dialogRef = this.dialogService.open(FiltersDialogComponent, {
      minWidth: '500px',
      data: {
        selectedBrands: this.selectedBrands,
        selectedTypes: this.selectedTypes
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedBrands = result.selectedBrands;
        this.selectedTypes = result.selectedTypes;
        this.filters.brands = this.selectedBrands;
        this.filters.types = this.selectedTypes;
        this.loadProducts();
      }
    });
  }

  onSortChange() {
    this.filters.sorting = this.selectedSort;
    this.loadProducts();
  }
}
