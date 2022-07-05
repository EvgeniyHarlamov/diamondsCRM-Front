import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NotificationsT } from "../types/questionnaires";
import { RootState } from "../app/store";
import { domain } from "../constants";


interface InitState {
    notification: NotificationsT
    notificationFetched: boolean
    errorMessage: string
}

const initialState:InitState = {
    notification: {
        count: 0,
        notifications: []
      },
      notificationFetched: false,
      errorMessage: '',
}

  export const getNotifications =
createAsyncThunk<any, {}, {rejectValue: any}>
(
    `${domain}/notifications/notifications.get`,
    async ({}:{}, thunkAPI) => {
        try {
          const token = localStorage.getItem('token');

          const response = await fetch(
            `${domain}/notifications/notifications.get`,
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
            if (data.success) {
                return data;
            } else {
              return thunkAPI.rejectWithValue((data as any));
            }
          } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
    }
)

export const clearNotifications =
createAsyncThunk<any, {}, {rejectValue: any}>
(
    `${domain}/notifications/notifications.clear`,
    async ({}:{}, thunkAPI) => {
        try {
          const token = localStorage.getItem('token');

          const response = await fetch(
            `${domain}/notifications/notifications.clear`,
            {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
              }
            );
            let data = await response.json();
            if (data.success) {
                return data;
            } else {
              return thunkAPI.rejectWithValue((data as any));
            }
          } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
    }
)


export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
      clearErrors: (state) => {
        state.errorMessage = '';
        return state;
      },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getNotifications.fulfilled, (state, {payload}) => {
            state.notification = payload.data;
            state.notificationFetched = !state.notificationFetched;
            return state;
          })
          .addCase(getNotifications.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
            return state;
          })
          .addCase(clearNotifications.fulfilled, (state, {payload}) => {
            state.notificationFetched = !state.notificationFetched;
            return state;
          })
          .addCase(clearNotifications.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
            return state;
          })
      },
})

export const { clearErrors } = notificationsSlice.actions;

export const notificationsSelector = (state:RootState) => state.notifications;
export const notificationsErrorsSelector = (state:RootState) => state.notifications.errorMessage;