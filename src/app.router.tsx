import { Common } from '@modules/common';
import { RouteAuth } from '@modules/route-auth';
import { RouteServices } from '@modules/route-services';
import { RouteTrade } from '@modules/route-trade';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { MasterLayout } from './app.master.layout';
import { NotFoundPage } from './app.not-found.page';

export const router = createBrowserRouter([
    {
        path: 'auth/*',
        element: (
            <MasterLayout hideHeader>
                <RouteAuth.Element />
            </MasterLayout>
        ),
    },
    {
        path: ':language?',
        element: (
            <Common.RouteLanguageProvider indexPath='trade'>
                <MasterLayout>
                    <Common.AssetsProvider>
                        {(loading) => {
                            if (loading) {
                                return (
                                    <Common.FloatingPanel>
                                        <Common.Spinner />
                                    </Common.FloatingPanel>
                                );
                            }
                            return <Outlet />;
                        }}
                    </Common.AssetsProvider>
                </MasterLayout>
            </Common.RouteLanguageProvider>
        ),
        children: [
            { index: true, element: <Navigate to='trade' replace /> },
            { path: 'trade/*', element: <RouteTrade.Element /> },
            { path: 'services/*', element: <RouteServices.Element /> },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
]);
