import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import download from "downloadjs";
import { RootState } from "../app/store";
import { domain } from "../constants";
import { DocCardT } from "../types";
import { addHistoryT, AddMallingT, CommentT, CreatePresentationT, CurrentMatchT, currentQ, DeleteFileT, DeletePhotoT, DownloadFileT, getHistoryT, GetMakeDateT, GetMatchT, GridSearchParams, GridSearchResponse, MakeDateT, MatchT, NotificationsT, PresentationT, QResponse, questionnairesT, removeHistoryT, RemoveMatchT, SetStatusT, StatsT, UploadFileT, UploadPhotoT, ViewMatchT } from "../types/questionnaires";
import fetchWithQueryParams from "../utils/fetchWithQueryParams";



interface InitState  {
    questionnaires: questionnairesT,
    questionnairesIsLoading: boolean,
    current: currentQ,
    errorMessage: string
    isFetched: boolean
    photosFetched: boolean
    filesFetched: boolean
    commentsFetched: boolean
    clearCommentInput: boolean
    comments: Array<CommentT>
    match: Array<MatchT>
    matchIsFetched: boolean
    matchIsLoaded: boolean
    stats: StatsT
    statsLoaded: boolean
    girlsList: any
    currentMatch: CurrentMatchT | null
    presentation: PresentationT
}



const initialState:InitState = {
    questionnaires: {
      pagination: {
        total: 0,
        offset: 0,
        limit: 0,
        page_available: 0
      },
      questionnaires: []
    },
    current: {
      files: {
        files: [],
        photos: []
      },
      my_appearance: {},
      my_information: {},
      my_personal_qualities: {},
      partner_appearance: {},
      partner_information: {},
      personal_qualities_partner: [],
      test: {},
      application: null,
      histories: [],
      matched_count: 0
    },
    questionnairesIsLoading: false,
    errorMessage: '',
    isFetched: false,
    clearCommentInput: false,
    photosFetched: false,
    filesFetched: false,
    commentsFetched: false,
    comments: [],
    match: [],
    matchIsFetched: false,
    matchIsLoaded: false,
    stats: {
      online_count: 0,
      questionnaires_all_count: 0,
      applications_all_count: 0,
      questionnaires_new_count: 0,
      applications_new_count: 0,
      last_applications: [],
    },
    statsLoaded: false,
    girlsList: [],
    currentMatch: null,
    presentation: {
      fetching: true,
      link: null
    }
}



export const viewQuestionnaire =
createAsyncThunk<QResponse, currentQ, {rejectValue: QResponse}>
(
    `${domain}/questionnaire/questionnaire.view`,
    async ({id}:any, thunkAPI:any) => {
        try {
            const token = localStorage.getItem('token');
            let url = new URL(`${domain}/questionnaire/questionnaire.view`)
            url.search = new URLSearchParams({id: id}).toString();
            let request = url.toString();
            const response = await fetchWithQueryParams(
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
              return thunkAPI.rejectWithValue((data as any));
            }
          } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
        }
);

export const getQuestionnaires =
createAsyncThunk<GridSearchResponse, GridSearchParams, {rejectValue: GridSearchResponse}>
(
    `${domain}/questionnaire/questionnaire.get`,
    async ({sex, country, city, service_type, responsibility, page, limit, from_age, to_age, search, is_archive, order_by}, thunkAPI) => {
        try {
            let params: any = {};
            if (sex) params.sex = sex;
            if (country) params.country = country;
            if (city) params.city = city;
            if (service_type) params.service_type = service_type;
            if (responsibility) params.responsibility = responsibility;
            if (page) params.page = page;
            if (limit) params.limit = limit;
            if (from_age) params.from_age = from_age;
            if (to_age) params.to_age = to_age;
            if (search) params.search = search;
            if (is_archive) params.is_archive = is_archive;
            if (order_by) params.order_by = order_by;

            const token = localStorage.getItem('token');
            let url = new URL(`${domain}/questionnaire/questionnaire.get`)
            url.search = new URLSearchParams(params).toString();
            let request = url.toString();

            const response = await fetchWithQueryParams(
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
              return thunkAPI.rejectWithValue((data as any));
            }
          } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
        }
);

export const uploadFile =
createAsyncThunk<any, UploadFileT, {rejectValue: any}>
(
    `${domain}/questionnaire/questionnaire.uploadFile`,
    async ({questionnaire_id, file, type}:UploadFileT, thunkAPI:any) => {
        try {
          const token = localStorage.getItem('token');
          let sendedFile = new FormData();
          sendedFile.append("file", file);
          sendedFile.append('questionnaire_id', questionnaire_id);
          sendedFile.append('type', type);


          const response = await fetch(
          `${domain}/questionnaire/questionnaire.uploadFile`,
          {
              method: 'POST',
              headers: {
                  Authorization: `Bearer ${token}`,
              },
              body: sendedFile
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
);

export const uploadPhoto =
createAsyncThunk<any, UploadPhotoT, {rejectValue: any}>
(
    `${domain}/questionnaire/questionnaire.uploadPhoto`,
    async ({questionnaire_id, file}:UploadPhotoT, thunkAPI:any) => {
        try {
          const token = localStorage.getItem('token');
          let sendedFile = new FormData();
          sendedFile.append("file", file);
          sendedFile.append('questionnaire_id', questionnaire_id);


          const response = await fetch(
          `${domain}/questionnaire/questionnaire.uploadPhoto`,
          {
              method: 'POST',
              headers: {
                  Authorization: `Bearer ${token}`,
              },
              body: sendedFile
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
);

export const deletePhoto =
createAsyncThunk<any, DeletePhotoT, {rejectValue: any}>
(
    `${domain}/questionnaire/questionnaire.deletePhoto`,
    async ({questionnaire_id, photo_id}:DeletePhotoT, thunkAPI:any) => {
        try {
          let params: any = {};
          params.questionnaire_id = questionnaire_id;
          params.photo_id = photo_id;
          const token = localStorage.getItem('token');

          let url = new URL(`${domain}/questionnaire/questionnaire.deletePhoto`)
          url.search = new URLSearchParams(params).toString();
          let request = url.toString();

          const response = await fetch(
            request,
          {
              method: 'DELETE',
              headers: {
                  Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                questionnaire_id: Number(questionnaire_id),
                photo_id: photo_id
              })
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
);


export const downloadFile =
createAsyncThunk<any, DownloadFileT, {rejectValue: any}>
(
    `${domain}/questionnaire/questionnaire.downloadFile`,
    async ({questionnaire_id, file_id, file_name}:DownloadFileT, thunkAPI:any) => {
        try {
          const token = localStorage.getItem('token');


          const response = await fetch(
          `${domain}/questionnaire/questionnaire.downloadFile`,
          {
              method: 'POST',
              headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                questionnaire_id: questionnaire_id,
                file_id,
              }),

          }
          );
          let file = await response.blob();
          if (file) {
              download(file, file_name);
          } else {
              return thunkAPI.rejectWithValue((file as any));
            }
          } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
        }
);

export const deleteFile =
createAsyncThunk<any, DeleteFileT, {rejectValue: any}>
(
    `${domain}/questionnaire/questionnaire.deleteFile`,
    async ({questionnaire_id, file_id}:DeleteFileT, thunkAPI) => {
        try {
            let params: any = {};
            params.questionnaire_id = questionnaire_id;
            params.file_id = file_id;

            const token = localStorage.getItem('token');
            let url = new URL(`${domain}/questionnaire/questionnaire.deleteFile`)
            url.search = new URLSearchParams(params).toString();
            let request = url.toString();

            const response = await fetch(
              request,
              {
                method: 'DELETE',
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
);

export const getHistory =
createAsyncThunk<any, getHistoryT, {rejectValue: any}>
(
    `${domain}/questionnaire/questionnaire.getHistory`,
    async ({questionnaire_id}:getHistoryT, thunkAPI) => {
        try {
            let params: any = {};
            params.questionnaire_id = questionnaire_id;

            const token = localStorage.getItem('token');
            let url = new URL(`${domain}/questionnaire/questionnaire.getHistory`)
            url.search = new URLSearchParams(params).toString();
            let request = url.toString();

            const response = await fetchWithQueryParams(
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
              return thunkAPI.rejectWithValue((data as any));
            }
          } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
        }
);

export const addHistory =
createAsyncThunk<any, addHistoryT, {rejectValue: any}>
(
    `${domain}/questionnaire/questionnaire.addHistory`,
    async ({questionnaire_id, comment}:addHistoryT, thunkAPI) => {
        try {

            const token = localStorage.getItem('token');
            const response = await fetch(
              `${domain}/questionnaire/questionnaire.addHistory`,
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                  questionnaire_id: questionnaire_id,
                  comment: comment
                })
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
);

export const removeHistory =
createAsyncThunk<any, removeHistoryT, {rejectValue: any}>
(
    `${domain}/questionnaire/questionnaire.removeHistory`,
    async ({questionnaire_id, history_id}:removeHistoryT, thunkAPI) => {
        try {

            const token = localStorage.getItem('token');
            const response = await fetch(
              `${domain}/questionnaire/questionnaire.removeHistory`,
              {
                method: 'DELETE',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                  questionnaire_id,
                  history_id
                })
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
);

export const setStatus =
createAsyncThunk<any, SetStatusT, {rejectValue: any}>
(
    `${domain}/questionnaire/questionnaire.setStatus`,
    async ({questionnaire_id, status}:SetStatusT, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
              `${domain}/questionnaire/questionnaire.setStatus`,
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                  questionnaire_id: questionnaire_id,
                  status: status,
                })
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
);

export const getMatch =
createAsyncThunk<any, GetMatchT, {rejectValue: any}>
(
    `${domain}/questionnaire/questionnaire.getMatch`,
    async ({questionnaire_id, limit, page}:GetMatchT, thunkAPI) => {
        try {
          let params: any = {};
          params.questionnaire_id = questionnaire_id;
          if (limit) params.limit = limit;
          if (page) params.page = page;

          const token = localStorage.getItem('token');
          let url = new URL(`${domain}/questionnaire/questionnaire.getMatch`)
          url.search = new URLSearchParams(params).toString();
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
                // body: JSON.stringify({
                //   questionnaire_id: questionnaire_id,
                // })
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
);

export const getStats =
createAsyncThunk<any, {}, {rejectValue: any}>
(
    `${domain}/analytics/analytics.get`,
    async ({}, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(
              `${domain}/analytics/analytics.get`,
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

export const getMakeDate =
createAsyncThunk<any, GetMakeDateT, {rejectValue: any}>
(
    `${domain}/questionnaire/questionnaire.getMakeDate`,
    async ({questionnaire_id}, thunkAPI) => {
        try {
          let params: any = {};
          params.questionnaire_id = questionnaire_id;

          const token = localStorage.getItem('token');
          let url = new URL(`${domain}/questionnaire/questionnaire.getMakeDate`)
          url.search = new URLSearchParams(params).toString();
          let request = url.toString();

          const response = await fetchWithQueryParams(
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
              return thunkAPI.rejectWithValue((data as any));
            }
          } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
    }
)

export const makeDate =
createAsyncThunk<any, MakeDateT, {rejectValue: any}>
(
    `${domain}/questionnaire/questionnaire.makeDate`,
    async ({questionnaire_id, with_questionnaire_id, time, date}: MakeDateT, thunkAPI) => {
        try {

          const token = localStorage.getItem('token');

          const response = await fetch(
            `${domain}/questionnaire/questionnaire.makeDate`,
            {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({questionnaire_id, with_questionnaire_id, time, date})
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

export const viewMatch =
createAsyncThunk<any, ViewMatchT, {rejectValue: any}>
(
    `${domain}/questionnaire/questionnaire.viewMatch`,
    async ({questionnaire_id, with_questionnaire_id}: ViewMatchT, thunkAPI) => {
        try {
          let params: any = {};
          params.questionnaire_id = questionnaire_id;
          params.with_questionnaire_id = with_questionnaire_id;

          const token = localStorage.getItem('token');
          let url = new URL(`${domain}/questionnaire/questionnaire.viewMatch`)
          url.search = new URLSearchParams(params).toString();
          let request = url.toString();

          const response = await fetchWithQueryParams(
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
              return thunkAPI.rejectWithValue((data as any));
            }
          } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
          }
    }
)

export const addMalling =
createAsyncThunk<any, AddMallingT, {rejectValue: any}>
(
    `${domain}/questionnaire/questionnaire.addMalling`,
    async ({questionnaire_id, add_questionnaire_id}: AddMallingT, thunkAPI) => {
        try {

          const token = localStorage.getItem('token');

          const response = await fetch(
            `${domain}/questionnaire/questionnaire.addMalling`,
            {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  questionnaire_id,
                  add_questionnaire_id
                })
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


export const removeMalling =
createAsyncThunk<any, RemoveMatchT, {rejectValue: any}>
(
    `${domain}/questionnaire/questionnaire.removeMalling`,
    async ({questionnaire_id, added_questionnaire_id}: RemoveMatchT, thunkAPI) => {
        try {
          let params: any = {};
          params.questionnaire_id = questionnaire_id;
          params.added_questionnaire_id = added_questionnaire_id;

          const token = localStorage.getItem('token');
          let url = new URL(`${domain}/questionnaire/questionnaire.removeMalling`)
          url.search = new URLSearchParams(params).toString();
          let request = url.toString();

          const response = await fetch(
            request,
            {
                method: 'DELETE',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(params)
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


export const createPresentation =
createAsyncThunk<any, CreatePresentationT, {rejectValue: any}>
(
    `${domain}/questionnaire/questionnaire.createPresentation`,
    async ({questionnaire_id}: CreatePresentationT, thunkAPI) => {
        try {

          const token = localStorage.getItem('token');

          const response = await fetch(
            `${domain}/questionnaire/questionnaire.createPresentation`,
            {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  questionnaire_id,
                })
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



export const questionnairesSlice = createSlice({
    name: 'questionnaires',
    initialState,
    reducers: {
      ClearState: (state) => {
        state.errorMessage = '';
        state.filesFetched = false;
        state.photosFetched = false;
        state.commentsFetched = false;
        return state;
      },
      resetCurrent: (state) => {
        state.current = initialState.current;
        return state;
      },
      addInitialComments: (state, action) => {
        state.comments = action.payload.data;
      },
      clearLink: (state) => {
        state.presentation.link = null;
      },
      resetCommentsIndicator: (state) => {
        state.clearCommentInput = false;
      }
  },
    extraReducers: (builder) => {
        builder
          .addCase(viewQuestionnaire.fulfilled, (state, {payload}) => {
            state.current = payload.data;
            state.isFetched = true;
            return state;
          })
          .addCase(viewQuestionnaire.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
          })
          .addCase(getQuestionnaires.fulfilled, (state, {payload}) => {
            state.questionnaires = payload.data;
            state.questionnairesIsLoading = true;
            return state;
          })
          .addCase(getQuestionnaires.pending, (state, {payload}) => {
            state.questionnairesIsLoading = false;
            return state;
          })
          .addCase(getQuestionnaires.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
          })
          .addCase(getHistory.fulfilled, (state, {payload}) => {
            state.comments = payload.data;
            return state;
          })
          .addCase(uploadFile.fulfilled, (state, {payload}) => {
            state.filesFetched = !state.filesFetched;
            return state;
          })
          .addCase(uploadFile.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
            state.filesFetched = !state.filesFetched;

          })
          .addCase(deleteFile.fulfilled, (state, {payload}) => {
            state.filesFetched = !state.filesFetched;
            return state;
          })
          .addCase(deleteFile.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
            state.filesFetched = !state.filesFetched;
          })
          .addCase(uploadPhoto.fulfilled, (state, {payload}) => {
            state.photosFetched = !state.photosFetched;
            return state;
          })
          .addCase(uploadPhoto.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
            state.photosFetched = !state.photosFetched;
            return state;
          })
          .addCase(deletePhoto.fulfilled, (state, {payload}) => {
            state.photosFetched = !state.photosFetched;
            return state;
          })
          .addCase(deletePhoto.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
            state.photosFetched = !state.photosFetched;
            return state;
          })
          .addCase(getMatch.fulfilled, (state, {payload}) => {
            state.match = payload.data;
            state.matchIsLoaded = true;
            return state;
          })
          .addCase(getMatch.pending, (state, {payload}) => {
            state.matchIsLoaded = false;
            return state;
          })
          .addCase(getMatch.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
            return state;
          })
          .addCase(getStats.fulfilled, (state, {payload}) => {
            state.stats = payload.data;
            state.statsLoaded = true;
            return state;
          })
          .addCase(getStats.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
          })
          .addCase(addHistory.fulfilled, (state, {payload}) => {
            state.commentsFetched = true;
            state.clearCommentInput = true;
            return state;
          })
          .addCase(addHistory.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
            state.commentsFetched = false;
            return state;
          })
          .addCase(removeHistory.fulfilled, (state, {payload}) => {
            state.commentsFetched = !state.commentsFetched;
            return state;
          })
          .addCase(removeHistory.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
            state.commentsFetched = !state.commentsFetched;
            return state;
          })
          .addCase(addMalling.fulfilled, (state, {payload}) => {
            state.matchIsFetched = !state.matchIsFetched;
            return state;
          })
          .addCase(addMalling.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
            state.matchIsFetched = !state.matchIsFetched;
            return state;
          })
          .addCase(removeMalling.fulfilled, (state, {payload}) => {
            state.matchIsFetched = !state.matchIsFetched;
            return state;
          })
          .addCase(removeMalling.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
            state.matchIsFetched = !state.matchIsFetched;
            return state;
          })
          .addCase(viewMatch.fulfilled, (state, {payload}) => {
            state.currentMatch = payload.data;
            return state;
          })
          .addCase(getMakeDate.fulfilled, (state, {payload}) => {
            state.girlsList = payload.data;
            return state;
          })
          .addCase(getMakeDate.rejected, (state, action) => {
            if (action.payload) state.errorMessage = action.payload.message || '';
            return state;
          })
          .addCase(createPresentation.pending, (state, action) => {
            state.presentation.fetching = false;
            return state;
          })
          .addCase(createPresentation.fulfilled, (state, {payload}) => {
            state.presentation.fetching = true;
            state.presentation.link = payload.data.download_link;
            window.open(payload.data.download_link, "_blank");
            return state;
          })

      },
})

export const { ClearState, resetCurrent, addInitialComments, clearLink, resetCommentsIndicator } = questionnairesSlice.actions;

export const questionnairesSelector = (state:RootState) => state.questionnaires;
export const questionnairesErrorSelector = (state:RootState) => state.questionnaires.errorMessage;