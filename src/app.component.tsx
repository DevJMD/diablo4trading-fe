import { RouterProvider } from 'react-router-dom';
import { router } from './app.router';
import { Common } from './modules/common';

export const App: React.FC = (

) => {
    return (
        <Common.AuthProvider>
            <Common.Theme>
                <RouterProvider router={router} />
            </Common.Theme>
        </Common.AuthProvider>
    )
};
