import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {fetchEmails} from './EmailAPI'
const initialState = {
    emails: [],
    selectedEmailId: 0,
    status: '',
    count:0,
}

export const fetchEmailReducer = createAsyncThunk(
    'emails/fetchAllEmails',
    async (amount) => {
      const response = await fetchEmails(amount);
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
  );

export const emailSlice = createSlice({
    name: 'emails',
    initialState,
    reducers: {
      updateSelectedEmail: (state, action) => {
        state.selectedEmailId = action.payload //TODO change this later
      },
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
      });
  },
  })
  export const { updateSelectedEmail } = emailSlice.actions;
  export const emailState = (state) => state.emails;
  export default emailSlice.reducer;