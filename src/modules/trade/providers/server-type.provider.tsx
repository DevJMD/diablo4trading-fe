import { Game } from '@diablosnaps/common';
import { ServerTypeContext } from './server-type.context';

interface ServerTypeProviderProps {
    value: Game.ServerType;
    children?: React.ReactNode;
}

export const ServerTypeProvider: React.FC<ServerTypeProviderProps> = ({
    value,
    children,
}) => {
    return (
        <ServerTypeContext.Provider value={value}>
            {children}
        </ServerTypeContext.Provider>
    )
}