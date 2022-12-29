import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from "../layout/MainLayout";

const Main = Loadable(lazy(() => import('views/main')))

// ==============================|| MAIN ROUTING ||============================== //
const MainRoute = {
    path: '/',
    element: (
      <AuthGuard>
          <MainLayout />
      </AuthGuard>
    ),
    children: [
        {
            path: '/main',
            element:
              <Main />
        },
    ]
};

export default MainRoute;
