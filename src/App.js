import { Switch, Route } from 'react-router-dom';
import * as ROUTES from './constants/ROUTES';
import { Header } from './components/Header';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home/index'));
const Search = lazy(() => import('./pages/Search/index'));
const SignIn = lazy(() => import('./pages/SignIn/index'));
const SignUp = lazy(() => import('./pages/SignUp/index'));

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Route
        exact
        path={[ROUTES.HOME, ROUTES.CHECKOUT, ROUTES.SEARCH]}
        component={Header}
      />
      <Switch>
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.SEARCH} component={Search} />
        <Route path={ROUTES.HOME} component={Home} />
      </Switch>
    </Suspense>
  );
};
