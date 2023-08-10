import { FC, ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getCookie } from '../../services/utils';

interface IProps {
	children: ReactNode;
	path: string;
	exact?: boolean;
}

const ProtectedRoute: FC<IProps> = ({ children, ...rest }) => {
  return <Route {...rest} render={
      ({ location }) => getCookie('token') ? children : (<Redirect to={{ pathname: '/login', state: { from: location}}} />)} />;
}

export default ProtectedRoute;
