import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useReducer } from 'react';
import userReducer from './userSlice';
import tokenReducer from './tokenSlice';

export enum AppActions {
  INIT = 'app/init'
}

export const store = configureStore({
  reducer: combineReducers({
    user: userReducer,
    token: tokenReducer,
  }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch