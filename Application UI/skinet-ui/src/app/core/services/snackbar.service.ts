import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbar = inject(MatSnackBar);

  error(message: string) {
    this.snackbar.open(message, 'X', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-error'],
    });
  }

  success(message: string) {
    this.snackbar.open(message, 'X', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success'],
    });
  }

  warning(message: string) {
    this.snackbar.open(message, 'X', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-warning'],
    });
  }
}
