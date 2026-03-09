import { Injectable, OnDestroy } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { TranslationService } from './translation.service';
import { LanguageService } from './language.service';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl implements OnDestroy {
    private langSub?: Subscription;

    constructor(private translation: TranslationService, private languageService: LanguageService) {
        super();
        // Load labels for the initial language
        this.loadLabelsFor(this.languageService.currentLanguage());

        // When language changes, fetch the translations file and then update labels.
        this.langSub = this.languageService.language$.subscribe((lang) => {
            this.loadLabelsFor(lang);
        });
    }

    private async loadLabelsFor(lang: string): Promise<void> {
        // Use getTranslationForLanguage which loads the file and returns the specific key.
        const itemsPerPage = await this.translation.getTranslationForLanguage(lang, 'paginator.itemsPerPage');
        const nextPage = await this.translation.getTranslationForLanguage(lang, 'paginator.nextPage');
        const previousPage = await this.translation.getTranslationForLanguage(lang, 'paginator.previousPage');
        const firstPage = await this.translation.getTranslationForLanguage(lang, 'paginator.firstPage');
        const lastPage = await this.translation.getTranslationForLanguage(lang, 'paginator.lastPage');
        const rangeEmpty = await this.translation.getTranslationForLanguage(lang, 'paginator.rangeEmpty');
        const rangeTpl = await this.translation.getTranslationForLanguage(lang, 'paginator.rangeLabel');

        this.itemsPerPageLabel = itemsPerPage;
        this.nextPageLabel = nextPage;
        this.previousPageLabel = previousPage;
        this.firstPageLabel = firstPage;
        this.lastPageLabel = lastPage;

        // store range template for use in getRangeLabel
        this._rangeTpl = rangeTpl || '{start} - {end} of {length}';
        this._rangeEmpty = rangeEmpty || '0 of 0';

        this.changes.next();
    }

    // internal storage for range template
    private _rangeTpl = '{start} - {end} of {length}';
    private _rangeEmpty = '0 of 0';

    // MatPaginatorIntl defines getRangeLabel as a function property, so match that signature
    override getRangeLabel = (page: number, pageSize: number, length: number): string => {
        if (!length || pageSize === 0) {
            return this._rangeEmpty;
        }

        const startIndex = page * pageSize + 1;
        const endIndex = Math.min(length, (page + 1) * pageSize);

        return this._rangeTpl
            .replace('{start}', startIndex.toString())
            .replace('{end}', endIndex.toString())
            .replace('{length}', length.toString());
    };

    ngOnDestroy(): void {
        this.langSub?.unsubscribe();
    }
}
