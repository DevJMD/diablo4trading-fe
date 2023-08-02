import { Common } from '@modules/common';
import { I18n } from '@modules/i18n';
import { Redux } from '@modules/redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './app.router';

export const App: React.FC = (

) => {
    return (
        <Redux.StoreProvider>
            <I18n.Switch>
                <Common.Theme>
                    <RouterProvider router={router} />
                </Common.Theme>
            </I18n.Switch>
        </Redux.StoreProvider>
    )
};
