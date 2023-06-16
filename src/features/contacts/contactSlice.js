import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import ContactService from "./contactService";

export const getContacts = createAsyncThunk(
  "Contact/get-contacts",
  async (thunkAPI) => {
    try {
      return await ContactService.getContacts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getContact = createAsyncThunk(
  "Contact/get-contact",
  async (id, thunkAPI) => {
    try {
      return await ContactService.getContact(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "Contact/delete-contact",
  async (id, thunkAPI) => {
    try {
      return await ContactService.deleteContact(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  contacts: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.contacts = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.contactName = action.payload.name;
      })
      .addCase(getContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedContact = action.payload;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default contactSlice.reducer;
