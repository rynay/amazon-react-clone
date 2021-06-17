import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({ path, fallback, condition, component }) => {
  return (
    <>
      <Route
        path={path}
        component={condition ? component : <Redirect to={fallback} />}
      />
    </>
  );
};
