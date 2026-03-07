import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LanguageService } from './language.service';

export const languageInterceptor: HttpInterceptorFn = (req, next) => {
    const languageService = inject(LanguageService);
    const lang = languageService.currentLanguage();

    const clonedReq = req.clone({
        setHeaders: {
            'Accept-Language': lang
        }
    });

    return next(clonedReq);
};
