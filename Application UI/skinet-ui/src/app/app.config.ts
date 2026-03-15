import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { languageInterceptor } from './core/services/language/language.interceptor';
import 'zone.js';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './core/services/language/custom-mat-paginator-intl';

import { routes } from './app.routes';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideHttpClient(withInterceptors([languageInterceptor, errorInterceptor, loadingInterceptor])),
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ]
};
