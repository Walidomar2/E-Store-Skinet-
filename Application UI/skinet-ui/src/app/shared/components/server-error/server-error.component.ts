import { Component } from '@angular/core';
import { TranslatePipe } from '../../../core/services/language/translation.service';

@Component({
  selector: 'app-server-error',
  imports: [TranslatePipe],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css',
})
export class ServerErrorComponent {

}
