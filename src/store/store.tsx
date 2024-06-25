import { Reducer, combineReducers, configureStore } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';
import { RecipesState } from '../models/RecipesStateModels';
import { UserProfilState } from '../models/UserProfilStateModels';
import { RecipesAction } from './recipes/actions';
import { recipesReducer } from './recipes/reducers';
import { UserProfilAction } from './userProfil/actions';
import { userProfilReducer } from './userProfil/reducers';

const rootReducer = combineReducers({
  userProfil: userProfilReducer as Reducer<UserProfilState, UserProfilAction>,
  recipes: recipesReducer as Reducer<RecipesState, RecipesAction>,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
