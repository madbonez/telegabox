import { http } from '@/lib/http';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface Token {
  refreshToken: string;
  accessToken: string;
}

export interface TokenState {
    token: Token | null;
    status: string | null;
}

export enum TokenAction {
  LOGOUT = 'token/logout'
}

export type TokenReducers<T> = {
}


export function logout() {
  return {
    type: TokenAction.LOGOUT,
  }
}

export const getToken = createAsyncThunk('token/getToken', async (code: string) => {
  return await http('https://d5d0786vba0ja5ed6top.apigw.yandexcloud.net/token', null, 'POST', {code});
});

export const tokenSlice = createSlice<TokenState, TokenReducers<TokenState>>({
  name: 'token',
  initialState: {
    token: null,
    status: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(TokenAction.LOGOUT, (state, action) => {
        state.token = null;
      })
      .addCase(getToken.rejected, (state, action) => {
        state.status = 'error'
      })
      .addCase(getToken.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getToken.fulfilled, (state, action) => {   
        state.token = action.payload as unknown as Token;
        state.status = 'idle'
      });
  }
})

tokenSlice.actions

export default tokenSlice.reducer;