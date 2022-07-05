import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { domain } from "../constants";
import { EmployeesResponseT, EmployeeT, UpdateEmployeePasswordT, ArchiveEmployeeT, UpdateEmployeeDataT, CreateEmployeeT } from "../types/employees";


interface InitState  {
    employees: {
        count: number,
        data: Array<EmployeeT> | []
    },
    errorMessage: string
    isLoaded: boolean
}

const initialState:InitState = {
    employees: {
        count: 0,
        data: []
    },
    errorMessage: '',
    isLoaded: false
}

export const getEmployees =
createAsyncThunk<EmployeesResponseT, {}, {rejectValue: EmployeesResponseT}>
(
    `${domain}/employee/employee.get`,
    async ({}, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `${domain}/employee/employee.get`,
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
              return thunkAPI.rejectWithValue((data as EmployeesResponseT));
            }
          } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
        }
)

export const updateEmployeePassword =
createAsyncThunk<EmployeesResponseT, UpdateEmployeePasswordT, {rejectValue: EmployeesResponseT}>
(
    `${domain}/employee/employee.newPassword`,
    async ({name, user_id}:UpdateEmployeePasswordT, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `${domain}/employee/employee.newPassword`,
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                  name,
                  user_id,
                }),
              }
            );
            let data = await response.json();
            if (data.success) {
                return data;
            } else {
              return thunkAPI.rejectWithValue((data as EmployeesResponseT));
            }
          } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
        }
)

export const archiveEmployee =
createAsyncThunk<EmployeesResponseT, ArchiveEmployeeT, {rejectValue: EmployeesResponseT}>
(
    `${domain}/employee/employee.archive`,
    async ({user_id}:ArchiveEmployeeT, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `${domain}/employee/employee.archive`,
              {
                method: 'DELETE',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                  user_id,
                }),
              }
            );
            let data = await response.json();
            if (data.success) {
                return data;
            } else {
              return thunkAPI.rejectWithValue((data as EmployeesResponseT));
            }
          } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
        }
);

export const updateEmployeeData =
createAsyncThunk<EmployeesResponseT, UpdateEmployeeDataT, {rejectValue: EmployeesResponseT}>
(
    `${domain}/employee/employee.update`,
    async ({name, user_id, email, role, phone}:UpdateEmployeeDataT, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `${domain}/employee/employee.update`,
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                  name,
                  user_id,
                  email,
                  role: Number(role),
                  phone
                }),
              }
            );
            let data = await response.json();
            if (data.success) {
                return data;
            } else {
              return thunkAPI.rejectWithValue((data as EmployeesResponseT));
            }
          } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
        }
);

export const createEmployee =
createAsyncThunk<EmployeesResponseT, CreateEmployeeT, {rejectValue: EmployeesResponseT}>
(
    `${domain}/auth/auth.create`,
    async ({name, email, role, phone}:CreateEmployeeT, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `${domain}/auth/auth.create`,
              {
                method: 'PUT',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                  name,
                  email,
                  role,
                  phone
                }),
              }
            );
            let data = await response.json();
            if (data.success) {
                return data;
            } else {
              return thunkAPI.rejectWithValue((data as EmployeesResponseT));
            }
          } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
        }
);


export const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
      clearErrors: (state) => {
        state.errorMessage = '';
        return state;
      },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getEmployees.fulfilled, (state, {payload}) => {
            state.employees = payload.data;
            state.isLoaded = true;
            return state;
          })
          .addCase(getEmployees.pending, (state, {payload}) => {
            state.isLoaded = false;
            return state;
          })
          .addCase(getEmployees.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
          })
          .addCase(archiveEmployee.fulfilled, (state, {payload}) => {
            state.isLoaded = true;
            return state;
          })
          .addCase(archiveEmployee.pending, (state, {payload}) => {
            state.isLoaded = false;
            return state;
          })
          .addCase(archiveEmployee.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
          })
          .addCase(updateEmployeeData.fulfilled, (state, {payload}) => {
            state.isLoaded = true;
            return state;
          })
          .addCase(updateEmployeeData.pending, (state, {payload}) => {
            state.isLoaded = false;
            return state;
          })
          .addCase(updateEmployeeData.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
          })
          .addCase(createEmployee.fulfilled, (state, {payload}) => {
            state.isLoaded = true;
            return state;
          })
          .addCase(createEmployee.pending, (state, {payload}) => {
            state.isLoaded = false;
            return state;
          })
          .addCase(createEmployee.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
          })
      },
})

export const { clearErrors } = employeeSlice.actions;

export const employeesSelector = (state:RootState) => state.employees;
export const employeeErrorsSelector = (state:RootState) => state.employees.errorMessage;