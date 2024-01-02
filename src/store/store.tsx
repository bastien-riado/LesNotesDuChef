import { Reducer, combineReducers, configureStore } from '@reduxjs/toolkit';

import { ThemeChangeAction } from './actions';
import themeReducer from './reducers'; // Importez ThemeState depuis le fichier reducers
import { ThemeState } from '../models/themeStateModels';
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({
  theme: themeReducer as Reducer<ThemeState, ThemeChangeAction>,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
