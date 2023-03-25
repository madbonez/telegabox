import { http } from '@/lib/http';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store';
import { TokenAction } from './tokenSlice';

export interface User {
  [key: string]: any;
}

export interface UserState {
    user: User | null;
    status: string | null;
}

export type UserReducers<T> = {
}

export const getUserInfo = createAsyncThunk('user/getToken', async (_, { getState }) => {
  return await http('https://d5d77nh9147b9h84vju6.apigw.yandexcloud.net/user-info', (getState() as RootState).token.token);
});

export const userSlice = createSlice<UserState, UserReducers<UserState>>({
  name: 'user',
  initialState: {
    user: null,
    status: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(TokenAction.LOGOUT, (state, action) => {
        state.user = null;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = 'get token error'
      })
      .addCase(getUserInfo.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {   
        state.user = action.payload as unknown as User;
        state.status = 'idle'
      });
  }
})

export default userSlice.reducer