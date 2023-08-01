import { API } from '@sanctuaryteam/shared';
import React from 'react';

export interface AuthContext {
    user: API.User,
    login: () => void,
    logout: () => void,
}

export const AuthContext = React.createContext<AuthContext>(undefined);

export const useAuth = () => {
    return React.useContext(AuthContext);
}
