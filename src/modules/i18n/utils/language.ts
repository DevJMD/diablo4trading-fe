import { Language } from '../types';

export function getLanguageName(
    language: Language
): string {
    switch (language) {
        case Language.German: return 'Deutsch';
        case Language.English: return 'English';
        case Language.Spanish: return 'Español';
        case Language.French: return 'Français';
        case Language.Italian: return 'Italiano';
        case Language.Japanese: return '日本語';
        case Language.Korean: return '한국어';
        case Language.Polish: return 'Polski';
        case Language.Portuguese: return 'Português';
        case Language.Russian: return 'Pусский';
        case Language.Turkish: return 'Türkçe';
        case Language.SimplifiedChinese: return '简体中文';
        case Language.TraditionalChinese: return '中國傳統的';
        default: return language;
    }
}