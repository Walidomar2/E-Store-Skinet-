import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'en' | 'ar';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private readonly currentLanguageSignal = signal<Language>(this.getInitialLanguage());

    readonly currentLanguage = this.currentLanguageSignal.asReadonly();
    private readonly languageSubject = new BehaviorSubject<Language>(this.currentLanguage());
    readonly language$ = this.languageSubject.asObservable();
    
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
        this.languageSubject.next(language);
    }

    applySavedLanguage(): void {
        const language = (localStorage.getItem('app-language') as Language) || 'en';
        this.currentLanguageSignal.set(language);
        this.languageSubject.next(language);
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
