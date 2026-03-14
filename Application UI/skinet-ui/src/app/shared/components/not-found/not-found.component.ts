import { Component } from '@angular/core';
import { TranslatePipe } from '../../../core/services/language/translation.service';

@Component({
  selector: 'app-not-found',
  imports: [TranslatePipe],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {

}
