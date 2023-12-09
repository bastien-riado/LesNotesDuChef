import { Reducer, combineReducers, configureStore } from '@reduxjs/toolkit';
import themeReducer from './reducers'; // Importez ThemeState depuis le fichier reducers
import { ThemeState } from '../models/themeStateModels';
import { ThemeChangeAction } from './actions';

const rootReducer = combineReducers({
  theme: themeReducer as Reducer<ThemeState, ThemeChangeAction>,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
