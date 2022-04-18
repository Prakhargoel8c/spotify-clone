import React, { createElement, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useQuery } from '../hooks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginAsync, selectIsAuthenticated } from '../store/globalReducers/userSlice';

interface IUnAuthenticatedPath {
  componnent: React.FC;
  title: string;
}
const UnAuthenticatedPath: React.FC<IUnAuthenticatedPath> = ({ componnent, title }) => {
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const query = useQuery();
  const [cancelTokenSource] = useState(axios.CancelToken.source());

  useEffect(() => {
    const code = query.get('code');
    if (code) {
      dispatch(loginAsync({ code, cancelToken: cancelTokenSource.token }));
    }
  }, [query, dispatch, cancelTokenSource]);
  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>
            {process.env.REACT_APP_TITLE}-{title}
          </title>
        </Helmet>
        {createElement(componnent)}
      </>
    );
  }
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default UnAuthenticatedPath;
