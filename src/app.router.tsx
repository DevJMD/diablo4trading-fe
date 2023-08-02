import { Auth } from '@modules/auth';
import { Common } from '@modules/common';
import { I18n } from '@modules/i18n';
import { Trade } from '@modules/trade';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        path: 'auth/*',
        element: (
            <Common.MasterLayout hideHeader>
                <Auth.Element />
            </Common.MasterLayout>
        )
    },
    {
        path: ':language?',
        element: (
            <I18n.RouteLanguageProvider indexPath='trade'>
                <Common.MasterLayout>
                    <Outlet />
                </Common.MasterLayout>
            </I18n.RouteLanguageProvider>
        ),
        children: [
            { index: true, element: <Navigate to='trade' replace /> },
            { path: 'trade/*', element: <Trade.Element /> },
            { path: '*', element: <Common.NotFoundPage /> }
        ]
    }
]);
