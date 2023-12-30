import React, {useContext} from 'react';

import {AuthNavigation} from './authNavigation/AuthNavigation';
import MainNavigation from './mainNavigation/MainNavigation';
import {Authorization} from '../services/providers/AuthProvider';

export const Navigation = () => {
  const authContext = useContext(Authorization);
  if (!authContext) {
    return null;
  }

  const {user, isLoading} = authContext;

  if (isLoading) {
    return null;
  }

  return user ? <MainNavigation /> : <AuthNavigation />;
};
