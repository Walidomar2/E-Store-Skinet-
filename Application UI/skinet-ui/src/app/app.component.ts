import { Component, inject } from '@angular/core';
import { HeaderComponent } from "./layout/header/header.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent]
})
export class AppComponent {
  title = 'skinet-ui';

  // TranslationService is injected where needed (TranslatePipe/header)
}

