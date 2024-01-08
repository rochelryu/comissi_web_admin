import PropTypes from 'prop-types';
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import {routesName} from 'src/constants/routes';
import DashboardLayout from 'src/layouts/dashboard';
import {AdminStorage} from 'src/storages/admins_storage';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const VotingPage = lazy(() => import('src/pages/voting'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const CreateAdminPage = lazy(() => import('src/pages/createAdmin'));
export const CreateActualityPage = lazy(() => import('src/pages/create-actuality'));



// ----------------------------------------------------------------------


export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <ProtectRoute>
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </ProtectRoute>
      ),
      // action: () {

      // },
      children: [
        { element: <IndexPage />, index: true },
        { path: routesName.user, element: <UserPage /> },
        { path: routesName.voting, element: <VotingPage /> },
        { path: routesName.events, element: <ProductsPage /> },
        { path: routesName.sondages, element: <ProductsPage /> },
        { path: routesName.blog, element: <BlogPage /> },
        { path: routesName.createAdmin, element: <CreateAdminPage /> },
        { path: routesName.detailEvent, element: <ProductsPage /> },
        { path: routesName.createActuality, element: <CreateActualityPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

const ProtectRoute = ({children}) => {
  const isVerify = AdminStorage.verifyAdminLogged();
  if (isVerify) {
    return children;
  }
  return <Navigate to='/login' replace />
  
}

ProtectRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
