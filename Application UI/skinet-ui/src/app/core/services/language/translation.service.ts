import { Pipe, PipeTransform, effect, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { signal } from '@angular/core';
import { LanguageService } from './language.service';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    private readonly http = inject(HttpClient);
    private readonly languageService = inject(LanguageService);
    private readonly translations = signal<Record<string, any>>({});

    constructor() {
        this.loadTranslations(this.languageService.currentLanguage());

        // Load translations when language changes
        effect(() => {
            this.loadTranslations(this.languageService.currentLanguage());
        });
    }

    private loadTranslations(language: string): void {
        const lang = language;
        const url = `/assets/i18n/${lang}.json`;
        this.http.get<Record<string, any>>(url).subscribe(
            (data) => {
                this.translations.set(data || {});
            },
            () => {
                this.translations.set({});
            }
        );
    }

    translate(key: string): string {
        const keys = key.split('.');
        let value: any = this.translations();

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key; // Return the key if translation not found
            }
        }

        return typeof value === 'string' ? value : key;
    }

    getTranslations(): Record<string, any> {
        return this.translations();
    }

    async getTranslationForLanguage(language: string, key: string): Promise<string> {
        const url = `/assets/i18n/${language}.json`;
        try {
            const data = await firstValueFrom(this.http.get<Record<string, any>>(url));
            const keys = key.split('.');
            let value: any = data;
            for (const k of keys) {
                if (value && typeof value === 'object' && k in value) {
                    value = value[k];
                } else {
                    return key;
                }
            }
            return typeof value === 'string' ? value : key;
        } catch {
            return key;
        }
    }
}

@Pipe({
    name: 'translate',
    standalone: true,
    pure: false
})
export class TranslatePipe implements PipeTransform {
    private readonly translationService = inject(TranslationService);
    private readonly languageService = inject(LanguageService);

    transform(key: string): string {
        // Read current language signal so the pipe re-runs when language changes
        this.languageService.currentLanguage();

        // Read translations object to track its signal
        this.translationService.getTranslations();

        return this.translationService.translate(key);
    }
}
