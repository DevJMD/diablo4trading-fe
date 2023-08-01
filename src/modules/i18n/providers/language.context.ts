import React from 'react';
import { Location } from 'react-router-dom';
import { Language } from '../types';

export interface LanguageContext {
    language: Language;
    setLanguage: (language: Language, location: Location) => void;
}

export const LanguageContext = React.createContext<LanguageContext>(undefined);

export const useLanguage = () => {
    return React.useContext(LanguageContext);
}