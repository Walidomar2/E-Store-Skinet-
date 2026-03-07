import { Component } from '@angular/core';
import { ProductDto } from '../../../core/modals/shop.modals';

@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})

export class ProductItemComponent {

  product: ProductDto | null = null;

}
