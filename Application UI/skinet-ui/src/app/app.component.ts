import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { HeaderComponent } from "./layout/header/header.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LanguageService } from './core/services/language/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'skinet-ui';
  baseUrl = "http://localhost:5209/api/";
  products: any[] = [];
  private langSub?: Subscription;

  constructor(private http: HttpClient,
    private languageService: LanguageService) { }

  ngOnInit() {
    this.languageService.applySavedLanguage();
    this.fetchProducts();

    this.langSub = this.languageService.language$.subscribe(() => {
      this.fetchProducts();
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  private fetchProducts(): void {
    this.http.get<any>(this.baseUrl + "products").subscribe({
      next: response => this.products = response.items,
      error: error => console.log(error),
      complete: () => console.log("Request completed")
    });
  }

}

