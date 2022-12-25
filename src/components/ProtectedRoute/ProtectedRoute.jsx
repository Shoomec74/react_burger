import { Redirect, Route } from 'react-router-dom';
import { getCookie } from '../../services/utils.ts';

function ProtectedRoute({ children, ...rest }) {
  return <Route {...rest} render={
      ({ location }) => getCookie('token') ? children : (<Redirect to={{ pathname: '/login', state: { from: location}}} />)} />;
}

export default ProtectedRoute;
