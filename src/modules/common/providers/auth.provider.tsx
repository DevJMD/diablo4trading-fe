import { API } from '@sanctuaryteam/shared';
import React from 'react';
import { AuthContext } from './auth.context';

interface AuthProviderProps {
    children?: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
    children
}) => {
    const [user, setUser] = React.useState<API.User>(undefined);

    const value = React.useMemo<AuthContext>(() => {
        return {
            user,
            login: () => {
                setUser({
                    id: '1',
                    battleNetTag: 'JohnDoe#1234',
                });
            },
            logout: () => {
                setUser(undefined);
            }
        }
    }, [user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}