import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { domain } from "../constants";
import { EmployeesResponseT, EmployeeT, UpdateEmployeePasswordT, ArchiveEmployeeT, UpdateEmployeeDataT, CreateEmployeeT } from "../types/employees";
import { CityT, CountryT, GetCitiesT, GetCountriesT, UtilsCitiesResponseT, UtilsCountriesResponseT } from "../types/utils";


interface InitState  {
    // cities: Array<CityT> | []
    countries: Array<CountryT>
    errorMessage: string
}

const initialState:InitState = {
    // cities: [],
    countries: [],
    errorMessage: ''
}

// export const getCities =
// createAsyncThunk<UtilsCitiesResponseT, GetCitiesT, {rejectValue: UtilsCitiesResponseT}>
// (
//     `${domain}/utils/utils.cities`,
//     async ({title}:GetCitiesT, thunkAPI) => {
//         try {
//             const token = localStorage.getItem('token');

//             let url = new URL(`${domain}/utils/utils.cities`)
//             url.search = new URLSearchParams(title).toString();
//             let request = url.toString();

//             const response = await fetch(
//                 request,
//               {
//                 method: 'DELETE',
//                 headers: {
//                   Accept: 'application/json',
//                   'Content-Type': 'application/json',
//                   Authorization: `Bearer ${token}`
//                 },
//               }
//             );
//             let data = await response.json();
//             if (data.success) {
//                 return data;
//             } else {
//               return thunkAPI.rejectWithValue((data as UtilsCitiesResponseT));
//             }
//           } catch (e) {
//             console.log('Error', e.response.data);
//             thunkAPI.rejectWithValue(e.response.data);
//           }
//         }
// );

export const getCountries =
createAsyncThunk<UtilsCountriesResponseT, GetCountriesT, {rejectValue: UtilsCountriesResponseT}>
(
    `${domain}/utils/utils.countries`,
    async ({}:GetCountriesT, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(
                `${domain}/utils/utils.countries`,
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
              return thunkAPI.rejectWithValue((data as UtilsCitiesResponseT));
            }
          } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
        }
);




export const utilsSlice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
      clearErrors: (state) => {
        state.errorMessage = '';
        return state;
      },
    },
    extraReducers: (builder) => {
        builder
        //   .addCase(getCities.fulfilled, (state, {payload}) => {
        //     state.cities = payload.data;
        //     return state;
        //   })
        //   .addCase(getCities.rejected, (state, action) => {
        //     if (action.payload) state.errorMessage = action.payload.message || '';
        //   })
          .addCase(getCountries.fulfilled, (state, {payload}) => {
            state.countries = payload.data;
            return state;
          })
          .addCase(getCountries.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
          })

      },
})

export const { clearErrors } = utilsSlice.actions;

export const countriesSelector = (state:RootState) => state.utils.countries;
export const utilsErrorsSelector = (state:RootState) => state.utils.errorMessage;