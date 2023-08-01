import { Game } from '@diablosnaps/common';
import React from 'react';

export type ServerTypeContext = Game.ServerType;

export const ServerTypeContext = React.createContext<ServerTypeContext>(undefined);

export const useServerType = () => {
    return React.useContext(ServerTypeContext);
}
