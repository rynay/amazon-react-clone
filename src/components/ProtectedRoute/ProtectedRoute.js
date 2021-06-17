import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({ path, fallback, condition, component }) => {
  console.log(path, fallback, condition, component);
  const Item = component;
  return (
    <Route path={path}>
      {condition ? <Item /> : <Redirect to={fallback} />}
    </Route>
  );
};
