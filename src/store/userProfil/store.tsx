import { Reducer, combineReducers, configureStore } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';
import { UserProfilState } from '../../models/UserProfilStateModels';
import { UserProfilAction } from './actions';
import { userProfilReducer } from './reducers';

const rootReducer = combineReducers({
  userProfil: userProfilReducer as Reducer<UserProfilState, UserProfilAction>,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
