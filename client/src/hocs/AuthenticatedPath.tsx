import React, { createElement, useEffect, useState, Suspense, LazyExoticComponent } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { refreshTokenAsync, selectIsAuthenticated, selectUserToken } from '../store/globalReducers/userSlice';
import { WhiteSpinner } from '../components/Spinner';

interface IAuthenticatedPath {
  componnent: LazyExoticComponent<React.FC>;
  title: string;
}
const AuthenticatedPath: React.FC<IAuthenticatedPath> = ({ componnent, title }) => {
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userToken = useAppSelector(selectUserToken);
  const dispatch = useAppDispatch();
  const [cancelTokenSource] = useState(axios.CancelToken.source());

  const refreshToken = () => {
    if (!userToken) return;
    const intervalId = setInterval(() => {
      dispatch(refreshTokenAsync({ token: userToken.refreshToken, cancelToken: cancelTokenSource.token }));
    }, (userToken.expiresIn - 120) * 1000);
    return () => {
      clearInterval(intervalId);
    };
  };

  useEffect(refreshToken, [dispatch, cancelTokenSource]);

  if (isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>
            {process.env.REACT_APP_TITLE}-{title}
          </title>
        </Helmet>
        <Suspense fallback={<WhiteSpinner />}>{createElement(componnent)}</Suspense>
      </>
    );
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AuthenticatedPath;
