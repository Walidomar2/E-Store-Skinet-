import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../../../core/services/language/translation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-server-error',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css',
})
export class ServerErrorComponent {
  error?: HttpErrorResponse;
  private readonly router = inject(Router);
  readonly currentNavigation = this.router.currentNavigation;

  constructor() {
    const navigation = this.currentNavigation();
    if (navigation?.extras?.state) {
      this.error = navigation.extras.state['error'];
    }
  }
}
