import { configureStore } from '@reduxjs/toolkit'
import {authSlice} from '../features/authSlice';
import { employeeSlice } from '../features/employeesSlice';
import { applicationSlice } from '../features/applicationsSlice';
import { questionnairesSlice } from '../features/questionnairesSlice';
import { utilsSlice } from '../features/utilsSlice';
import { notificationsSlice } from '../features/notificationsSlice';

export const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
      employees: employeeSlice.reducer,
      applications: applicationSlice.reducer,
      questionnaires: questionnairesSlice.reducer,
      utils: utilsSlice.reducer,
      notifications: notificationsSlice.reducer
   },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
