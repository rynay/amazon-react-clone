import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import * as ROUTES from './constants/ROUTES';
import * as AC from './redux/AC';
import { Header } from './components/Header';
import { ProtectedRoute } from './components/ProtectedRoute';
import { lazy, Suspense } from 'react';
import s from './App.module.scss';
import SignIn from './pages/SignIn';

const Home = lazy(() => import('./pages/Home/index'));
const Search = lazy(() => import('./pages/Search/index'));
const SignUp = lazy(() => import('./pages/SignUp/index'));
const Checkout = lazy(() => import('./pages/Checkout/index'));
const Payment = lazy(() => import('./pages/Payment/index'));
const ReturnsAndOrders = lazy(() => import('./pages/ReturnsAndOrders/index'));

const App = ({ init, user }) => {
  useEffect(() => {
    const listener = init();
    return () => listener();
  }, []);
  return (
    <>
      <Route
        exact
        path={[
          ROUTES.HOME,
          ROUTES.CHECKOUT,
          ROUTES.SEARCH,
          ROUTES.RETURNS_AND_ORDERS,
        ]}
        component={Header}
      />
      <main className={s.container}>
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            <ProtectedRoute
              path={ROUTES.SIGN_IN}
              fallback={ROUTES.HOME}
              condition={!user}
              component={SignIn}
            />
            <ProtectedRoute
              path={ROUTES.SIGN_UP}
              fallback={ROUTES.HOME}
              condition={!user}
              component={SignUp}
            />
            <ProtectedRoute
              path={ROUTES.CHECKOUT}
              fallback={ROUTES.SIGN_IN}
              condition={!!user}
              component={Checkout}
            />
            <ProtectedRoute
              path={ROUTES.PAYMENT}
              fallback={ROUTES.SIGN_IN}
              condition={!!user}
              component={Payment}
            />
            <ProtectedRoute
              path={ROUTES.RETURNS_AND_ORDERS}
              fallback={ROUTES.SIGN_IN}
              condition={!!user}
              component={ReturnsAndOrders}
            />
            <Route path={ROUTES.SEARCH} component={Search} />
            <Route exact path={ROUTES.HOME} component={Home} />
          </Suspense>
        </Switch>
      </main>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  init: () => dispatch(AC.init()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
