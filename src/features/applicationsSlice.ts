import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import '../types/applications';
import { RootState } from '../app/store'
import { domain } from '../constants';
import { ApplicationsResponseT, ApplicationT, ApplicationViewResponseT, ChangeApplicationT, ChangeStatusApplicationsResponseT, createApplicationT, DeleteApplicationT, GetApplicationsT, StartWorkApplicationT, UpdateApplicationT, ViewApplicationT } from "../types/applications";
import 'url-search-params-polyfill';
import fetchWithQueryParams from "../utils/fetchWithQueryParams";



interface InitState  {
    applications:  Array<ApplicationT> | [],
    applications_archive: Array<ApplicationT> | [],
    errorMessage: string
    changedStatusLink: string,
    isFetching: boolean,
    isLoaded: boolean
    current: ApplicationT | null
}

const initialState:InitState = {
    applications: [],
    applications_archive: [],
    errorMessage: '',
    changedStatusLink: '',
    isFetching: false,
    isLoaded: false,
    current: null
}


export const getApplications =
createAsyncThunk<ApplicationsResponseT, GetApplicationsT, {rejectValue: ApplicationsResponseT}>
(
    `${domain}/applications/applications.get`,
    async ({archive_only, search, responsibility_id}:GetApplicationsT, thunkAPI) => {
        try {
            let params:any = {}
            if (archive_only) params.archive_only = archive_only;
            if (search) params.search = search;
            if (responsibility_id) params.responsibility_id = responsibility_id;

            const token = localStorage.getItem('token');

            let url = new URL(`${domain}/applications/applications.get`)
            url.search = new URLSearchParams(params).toString();
            let request = url.toString();

            let response = await fetchWithQueryParams(
                 request,
                {
                  method: 'GET',
                  headers: {
                    Authorization: `Bearer ${token}`
                  },
                }
              );

            let data = await response.json();
            if (data.success) {
                return data;
            } else {
              return thunkAPI.rejectWithValue((data as ApplicationsResponseT));
            }
          } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
    }
)

export const createApplication =
createAsyncThunk<ApplicationsResponseT, createApplicationT, {rejectValue: ApplicationsResponseT}>
(
    `${domain}/applications/applications.create`,
    async ({client_name, service_type, email, phone}:createApplicationT, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `${domain}/applications/applications.create`,
              {
                method: 'PUT',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                  client_name: client_name,
                  service_type: service_type,
                  email: email,
                  phone: phone
                }),
              }
            );
            let data = await response.json();
            if (data.success) {
                return data;
            } else {
              return thunkAPI.rejectWithValue((data as ApplicationsResponseT));
            }
          } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
    }
)

export const changeApplication =
createAsyncThunk<ChangeStatusApplicationsResponseT, ChangeApplicationT, {rejectValue: ApplicationsResponseT}>
(
    `${domain}/applications/applications.change`,
    async ({id, status}:ChangeApplicationT, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `${domain}/applications/applications.change`,
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                  id: id,
                  status: status,
                }),
              }
            );
            let data = await response.json();
            if (data.success) {
                return data;
            } else {
              return thunkAPI.rejectWithValue((data as ApplicationsResponseT));
            }
          } catch (e) {
            console.log('error');
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
    }
)

export const startWorkApplication =
createAsyncThunk<ApplicationsResponseT, StartWorkApplicationT, {rejectValue: ApplicationsResponseT}>
(
    `${domain}/applications/applications.startWork`,
    async ({id}:StartWorkApplicationT, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `${domain}/applications/applications.startWork`,
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                  id: id,
                }),
              }
            );
            let data = await response.json();
            if (data.success) {
                return data;
            } else {
              return thunkAPI.rejectWithValue((data as ApplicationsResponseT));
            }
          } catch (e) {
            console.log('error');
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
    }
)

export const deleteApplication =
createAsyncThunk<ApplicationsResponseT, DeleteApplicationT, {rejectValue: ApplicationsResponseT}>
(
    `${domain}/applications/applications.delete`,
    async ({id}:StartWorkApplicationT, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `${domain}/applications/applications.delete`,
              {
                method: 'DELETE',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                  id: id,
                }),
              }
            );
            let data = await response.json();
            if (data.success) {
                return data;
            } else {
              return thunkAPI.rejectWithValue((data as ApplicationsResponseT));
            }
          } catch (e) {
            console.log('error');
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
    }
)


export const updateApplication =
createAsyncThunk<ApplicationsResponseT, UpdateApplicationT, {rejectValue: ApplicationsResponseT}>
(
    `${domain}/applications/applications.update`,
    async ({id, client_name, phone, email, status}:UpdateApplicationT, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `${domain}/applications/applications.update`,
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                  id: id,
                  client_name: client_name,
                  phone: phone,
                  email: email,
                  status: status
                }),
              }
            );
            let data = await response.json();
            if (data.success) {
                return data;
            } else {
              return thunkAPI.rejectWithValue((data as ApplicationsResponseT));
            }
          } catch (e) {
            console.log('error');
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
    }
)

export const viewApplication =
createAsyncThunk<ApplicationViewResponseT, ViewApplicationT, {rejectValue: ApplicationViewResponseT}>
(
    `${domain}/applications/applications.view`,
    async ({id}:ViewApplicationT, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            let url = new URL(`${domain}/applications/applications.view`)
            url.search = new URLSearchParams({id: id.toString()}).toString();
            let request = url.toString();

            const response = await fetch(
                request,
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
              return thunkAPI.rejectWithValue((data as ApplicationViewResponseT));
            }
          } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
    }
);

export const startWork =
createAsyncThunk<ApplicationViewResponseT, ViewApplicationT, {rejectValue: ApplicationViewResponseT}>
(
    `${domain}/applications/applications.startWork`,
    async ({id}:ViewApplicationT, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(
              `${domain}/applications/applications.startWork`,
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                  id: id,
                }),
              }
            );
            let data = await response.json();
            if (data.success) {
                return data;
            } else {
              return thunkAPI.rejectWithValue((data as ApplicationViewResponseT));
            }
          } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
    }
);



export const applicationSlice = createSlice({
    name: 'applications',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errorMessage = '';
            state.isFetching = false;
            return state;
        },
			clearApplications: (state) => {
        	state.isFetching = false;
        	state.isLoaded = false;
        	state.applications = [];
        	state.applications_archive = [];
			}
    },
    extraReducers: (builder) => {
        builder
          .addCase(getApplications.fulfilled, (state, {payload}) => {
            if (payload.additional) state.applications_archive = payload.data;
            else state.applications = payload.data;
						state.isLoaded = true;
            return state;
          })
          .addCase(getApplications.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
          })

          .addCase(createApplication.fulfilled, (state, {payload}) => {
            state.isFetching = true;
            return state;
          })

          .addCase(createApplication.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
          })

          .addCase(changeApplication.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
          })

          .addCase(startWorkApplication.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
          })

          .addCase(deleteApplication.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
          })

          .addCase(updateApplication.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
          })

          .addCase(viewApplication.fulfilled, (state, {payload}) => {
            state.current = payload.data;
          })
      },
})

export const { clearErrors, clearApplications } = applicationSlice.actions;

export const applicationsSelector = (state:RootState) => state.applications;
export const applicationsErrorsSelector = (state:RootState) => state.applications.errorMessage;