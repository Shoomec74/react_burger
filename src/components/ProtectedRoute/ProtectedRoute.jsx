import { useSelector } from "react-redux";
import { Redirect, Route } from 'react-router-dom';
import { getCookie } from '../../services/utils.js';

function ProtectedRoute({ children, ...rest }) {
  return <Route {...rest} render={
      ({ location }) => getCookie('token') ? children : (<Redirect to={{ pathname: '/login', state: { from: location}}} />)} />;
}

export default ProtectedRoute;
