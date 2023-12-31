import {Reducer, combineReducers, configureStore} from '@reduxjs/toolkit';

import {ThemeChangeAction} from './actions';
import themeReducer from './reducers'; // Importez ThemeState depuis le fichier reducers
import {ThemeState} from '../models/themeStateModels';

const rootReducer = combineReducers({
  theme: themeReducer as Reducer<ThemeState, ThemeChangeAction>,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
