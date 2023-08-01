import Cookies from 'universal-cookie';
import { Language } from '../types';

const COOKIE_NAME = 'LANG';

export function retrieveLanguageFromCookie(): Language {
    const value = new Cookies().get(COOKIE_NAME) as Language;
    if (Object.values(Language).includes(value)) {
        return value;
    }
    return undefined
}

export function storeLanguageAsCookie(
    language: Language
) {
    new Cookies().set(COOKIE_NAME, language, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
    });
}

export function retrieveLanguageFromNavigator(): Language {
    // en-US
    const value = (navigator.language ?? '') as Language;
    if (Object.values(Language).includes(value)) {
        return value;
    }
    const [language] = value.split('-');
    const match = Object
        .entries(Language)
        .find(([, value]) => {
            return value.split('-')[0] === language
        });
    if (match) {
        return match[1];
    }
    return undefined;
}