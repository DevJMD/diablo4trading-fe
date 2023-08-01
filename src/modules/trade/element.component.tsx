import { Game } from '@diablosnaps/common';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { Common } from '../common';
import { MasterLayout } from './layout';
import { ListingsPage, SearchPage, ServerTypePage } from './pages';
import { AssetsProvider, ServerTypeProvider } from './providers';

const SERVER_TYPE_PATHS: Record<Game.ServerType, string> = {
    [Game.ServerType.Eternal]: 'eternal',
    [Game.ServerType.Hardcore]: 'hardcore',
    [Game.ServerType.Seasonal]: 'seasonal',
    [Game.ServerType.SeasonalHardcore]: 'seasonal-hardcore',
};

export const Element: React.FC = (

) => {
    const navigate = useNavigate();

    const handleServerTypeChange = (serverType: Game.ServerType) => {
        navigate(`./${SERVER_TYPE_PATHS[serverType]}`);
    };

    return (
        <AssetsProvider>
            {loading => {
                if (loading) {
                    return (
                        <Common.FloatingPanel>
                            <Common.Spinner />
                        </Common.FloatingPanel>
                    );
                }
                return (
                    <Routes>
                        <Route index element={<ServerTypePage
                            onChange={handleServerTypeChange}
                        />} />
                        {Object
                            .values(Game.ServerType)
                            .map((serverType) => (
                                <Route
                                    key={serverType}
                                    path={`${SERVER_TYPE_PATHS[serverType]}/*`}
                                    element={(
                                        <ServerTypeProvider value={serverType}>
                                            <MasterLayout>
                                                <Outlet />
                                            </MasterLayout>
                                        </ServerTypeProvider>
                                    )}
                                >
                                    <Route path='*' index element={<Navigate to='search' replace />} />
                                    <Route path='search' element={<SearchPage />} />
                                    <Route path='listings' element={<ListingsPage />} />
                                </Route>
                            ))
                        }
                        <Route path='*' element={<Navigate to='/' replace />} />
                    </Routes>
                )
            }}
        </AssetsProvider>
    )
}