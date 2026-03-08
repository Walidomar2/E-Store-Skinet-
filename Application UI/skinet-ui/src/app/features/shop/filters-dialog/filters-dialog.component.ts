import { Component } from '@angular/core';
import { ShopService } from '../../../core/services/shop/shop.service';
import { LanguageService } from '../../../core/services/language/language.service';
import { Subscription } from 'rxjs';
import { TranslatePipe } from "../../../core/services/language/translation.service";
import { MatDivider } from '@angular/material/divider';
import { MatSelectionList, MatListOption } from '@angular/material/list';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-filters-dialog',
  imports: [TranslatePipe,
    MatDivider,
    MatSelectionList,
    MatListOption,
    MatButton
  ],
  templateUrl: './filters-dialog.component.html',
  styleUrl: './filters-dialog.component.css',
})
export class FiltersDialogComponent {
  brands: string[] = [];
  types: string[] = [];
  isLoading = false;
  langSub?: Subscription;

  constructor(private shopService: ShopService,
    private languageService: LanguageService) { }

  onInit() {
    this.languageService.applySavedLanguage();
    this.initData();
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
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


  initData() {
    this.getBrands();
    this.getTypes();
  }

}
