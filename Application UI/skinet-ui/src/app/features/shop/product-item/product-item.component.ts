import { Component, Input } from '@angular/core';
import { ProductDto } from '../../../core/modals/shop.modals';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from "../../../core/services/language/translation.service";

@Component({
  selector: 'app-product-item',
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    CurrencyPipe,
    MatButton,
    MatIcon,
    TranslatePipe
],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})

export class ProductItemComponent {
  @Input() product: ProductDto | null = null;

}
