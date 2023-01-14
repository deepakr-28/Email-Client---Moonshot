import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {fetchEmails, fetchEmailBody} from './EmailAPI'
const initialState = {
    emails: [],
    selectedEmailId: null,
    status: '',
    count:0,
    selectedFilter:'',
    selectedEmailBody:{},
    filteredEmailIds:[],
    favouriteEmailsIds:[]
}

export const fetchEmailReducer = createAsyncThunk(
    'emails/all',
    async () => {
      const response = await fetchEmails();
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
  );
export const fetchEmailBodyReducer = createAsyncThunk(
    'emails/body/id',
    async (id) => {
      const response = await fetchEmailBody(id);
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
  );

export const emailSlice = createSlice({
    name: 'emails',
    initialState,
    reducers: {
      updateSelectedEmail: (state, action) => {
        state.selectedEmailId = action.payload
      },
      updateSelectedFilter: (state, action) =>{
        state.selectedFilter = action.payload
      },
      updateFilteredIds: (state, action) =>{
        state.filteredEmailIds = action.payload
      },
      updateFavouriteEmails: (state, action) =>{
        state.favouriteEmailsIds = action.payload
      }
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmailReducer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmailReducer.rejected, (state) => {
        state.status = 'idle';
      })

      .addCase(fetchEmailReducer.fulfilled, (state, action) => {
        
        state.status = 'idle';
        state.emails = action.payload.list;
        state.count = action.payload.total;

        let emailId = action.payload.list.map(email => email.id)
        state.filteredEmailIds = emailId
      })

      .addCase(fetchEmailBodyReducer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmailBodyReducer.rejected, (state) => {
        state.status = 'idle';
      })

      .addCase(fetchEmailBodyReducer.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedEmailBody = action.payload;
      })
  },
  })
  export const { updateSelectedEmail, updateSelectedFilter, updateFilteredIds, updateFavouriteEmails } = emailSlice.actions;
  export const emailState = (state) => state.emails;
  export default emailSlice.reducer;