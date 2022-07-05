import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import '../types/auth';
import { RootState } from '../app/store'
import { AuthErrorT, AuthState, LoginResponseT, AuthUserDataT } from '../types/auth';
import {domain} from '../constants';



const initialState:AuthState = {
    username: '',
    email: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    isAuth: true
}

export const loginUser =
createAsyncThunk<LoginResponseT, AuthUserDataT, {rejectValue: AuthErrorT}>
(
    `${domain}/auth/auth.login`,
    async ( {email, password}:AuthUserDataT, thunkAPI ) => {
      try {
        const response = await fetch(
            `${domain}/auth/auth.login`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );
        let data = await response.json();
        console.log('response', data);
        if (data.success) {
          localStorage.setItem('token', data.data.token);
          return data;
        } else {
          return thunkAPI.rejectWithValue((data as AuthErrorT));
        }
      } catch (e) {
        console.log('Error', e.response.data);
        thunkAPI.rejectWithValue(e.response.data);
      }
    }
);

export const authMe =
createAsyncThunk<LoginResponseT, {}, {rejectValue: AuthErrorT}>
(
    `${domain}/auth/auth.me`,
    async ({}, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `${domain}/auth/auth.me`,
              {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
              }
            );
            let data = await response.json();
            // console.log(data);
            if (data.success) {
                return data;
            } else {
              return thunkAPI.rejectWithValue((data as AuthErrorT));
            }
          } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
        }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      clearState: (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isFetching = false;
        
        return state;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.fulfilled, (state, {payload}) => {
          if (payload.data) state.username = payload.data.name;
          state.isFetching = false;
          state.isSuccess = true;
          return state;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.isFetching = false;
          state.isError = true;
          if (action.payload) state.errorMessage = action.payload.message || '';
        })
        .addCase(loginUser.pending, (state) => {
          state.isFetching = true;
        })

        .addCase(authMe.fulfilled, (state, {payload}) => {
          if (payload.data) {
            state.username = payload.data.name;
          }
          state.isAuth = true;
          state.isFetching = false;
          state.isSuccess = true;
          return state;
        })

        .addCase(authMe.rejected, (state, action) => {
          state.isAuth = false;
          if (action.payload) state.errorMessage = action.payload.message || '';
        })
    },
});

export const { clearState } = authSlice.actions;

export const authSelector = (state:RootState) => state.auth;