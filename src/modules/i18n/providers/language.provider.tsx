import React from 'react';
import { Location, useNavigate, useParams } from 'react-router-dom';
import { Language } from '../types';
import { LanguageContext } from './language.context';
import { retrieveLanguageFromCookie, retrieveLanguageFromNavigator, storeLanguageAsCookie } from './language.helper';

const ROUTE_MAPPING: Record<Language, string> = {
    [Language.German]: 'de',
    [Language.English]: 'en',
    [Language.Spanish]: 'es',
    [Language.French]: 'fr',
    [Language.Italian]: 'it',
    [Language.Japanese]: 'ja',
    [Language.Korean]: 'ko',
    [Language.Polish]: 'pl',
    [Language.Portuguese]: 'pt',
    [Language.Russian]: 'ru',
    [Language.Turkish]: 'tr',
    [Language.SimplifiedChinese]: 'zh-cn',
    [Language.TraditionalChinese]: 'zh-tw',
};

const ROUTE_MAPPING_REVERSE: Record<string, Language> = Object
    .entries(ROUTE_MAPPING)
    .reduce<Record<string, Language>>((acc, [key, value]) => {
        acc[value] = key as Language;
        return acc;
    }, {});

interface LanguageProviderParams {
    language?: Language;
}

interface LanguageProviderProps {
    children?: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
    children
}) => {
    const navigate = useNavigate();

    const params: LanguageProviderParams = useParams();

    const language = ROUTE_MAPPING_REVERSE[params.language ?? ''];
    const setLanguage = React.useCallback((language: Language, location: Location) => {
        storeLanguageAsCookie(language);
        const pathname = ROUTE_MAPPING[language];
        navigate({
            ...location,
            pathname: location.pathname.replace(/^\/[^/]*/, `/${pathname}`)
        });
    }, [navigate]);

    const hasLanguage = !!language;

    React.useEffect(() => {
        if (!hasLanguage) {
            const next = retrieveLanguageFromCookie() || retrieveLanguageFromNavigator() || Language.English;
            const pathname = ROUTE_MAPPING[next];
            navigate(`/${pathname}`)
        }
    }, [hasLanguage, navigate])

    const value = React.useMemo<LanguageContext>(() => {
        return { language, setLanguage }
    }, [language, setLanguage]);

    if (!hasLanguage) {
        return null;
    }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}