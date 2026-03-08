import { Component, Inject, OnInit } from '@angular/core';
import { ShopService } from '../../../core/services/shop/shop.service';
import { LanguageService } from '../../../core/services/language/language.service';
import { Subscription } from 'rxjs';
import { TranslatePipe } from "../../../core/services/language/translation.service";
import { MatDivider } from '@angular/material/divider';
import { MatSelectionList, MatListOption } from '@angular/material/list';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-filters-dialog',
  imports: [TranslatePipe,
    MatDivider,
    MatSelectionList,
    MatListOption,
    MatButton,
    FormsModule
  ],
  templateUrl: './filters-dialog.component.html',
  styleUrl: './filters-dialog.component.css',
})
export class FiltersDialogComponent implements OnInit {
  brands: string[] = [];
  types: string[] = [];
  data = Inject(MAT_DIALOG_DATA);

  selectedBrands: string[] = this.data.selectedBrands || [];
  selectedTypes: string[] = this.data.selectedTypes || [];

  constructor(private shopService: ShopService,
    private languageService: LanguageService,
    private dialogService: MatDialogRef<FiltersDialogComponent>) { }

  ngOnInit() {
    this.initData();
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (response) => {
        this.brands = response;
      },
      error: (error) => {
        console.error('Error fetching brands:', error);
      }
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: (response) => {
        this.types = response;
      },
      error: (error) => {
        console.error('Error fetching types:', error);
      }
    });
  }

  initData() {
    this.getBrands();
    this.getTypes();
  }

  applyFilters() {
    this.dialogService.close({
      selectedBrands: this.selectedBrands,
      selectedTypes: this.selectedTypes
    });
  }

}
