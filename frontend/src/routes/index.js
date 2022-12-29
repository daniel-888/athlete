import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

// controller
import Loadable from 'ui-component/Loadable';
import LoginRoutes from './LoginRoutes';
import MainRoute from "./MainRoutes";

const LandingPage = Loadable(lazy(() => import('views/landing')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([
        { path: '/', element: <LandingPage /> },
        LoginRoutes,
        MainRoute
    ]);
}
