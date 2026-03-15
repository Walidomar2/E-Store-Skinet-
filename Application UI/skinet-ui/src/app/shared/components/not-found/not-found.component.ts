import { Component } from '@angular/core';
import { TranslatePipe } from '../../../core/services/language/translation.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {

}
