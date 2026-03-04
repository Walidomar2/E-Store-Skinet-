import { Injectable, signal } from '@angular/core';

export type Language = 'en' | 'ar';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private readonly currentLanguageSignal = signal<Language>(this.getInitialLanguage());

    readonly currentLanguage = this.currentLanguageSignal.asReadonly();

    private getInitialLanguage(): Language {
        // Check localStorage first
        const savedLanguage = localStorage.getItem('app-language') as Language | null;
        if (savedLanguage && ['en', 'ar'].includes(savedLanguage)) {
            return savedLanguage;
        }

        // Check browser language
        const browserLang = navigator.language.split('-')[0];
        if (browserLang === 'ar') {
            return 'ar';
        }

        return 'en'; // Default to English
    }

    setLanguage(language: Language): void {
        this.currentLanguageSignal.set(language);
        localStorage.setItem('app-language', language);
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }

    isArabic(): boolean {
        return this.currentLanguage() === 'ar';
    }

    isEnglish(): boolean {
        return this.currentLanguage() === 'en';
    }
}
