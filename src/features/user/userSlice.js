import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import UserService from "./userService";

export const getAllUsers = createAsyncThunk(
  "User/all-users",
  async (thunkAPI) => {
    try {
      return await UserService.getAllUser();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createUserMoi = createAsyncThunk(
  "User/create-user",
  async (userData, thunkAPI) => {
    try {
      return await UserService.createUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAUser = createAsyncThunk(
  "User/get-user",
  async (id, thunkAPI) => {
    try {
      return await UserService.getAUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateUserAdmin = createAsyncThunk(
  "User/update-user",
  async (user, thunkAPI) => {
    try {
      return await UserService.updateUserAdmin(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAUser = createAsyncThunk(
  "User/delete-user",
  async (id, thunkAPI) => {
    try {
      return await UserService.deleteUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  users: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createUserMoi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserMoi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
      })
      .addCase(createUserMoi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.email = action.payload.email;
        state.mobile = action.payload.mobile;
        state.firstname = action.payload.firstname;
        state.lastname = action.payload.lastname;
        state.isBlocked = action.payload.isBlocked;
        state.role = action.payload.role;
      })
      .addCase(getAUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateUserAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;
      })
      .addCase(updateUserAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedUser = action.payload;
      })
      .addCase(deleteAUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default userSlice.reducer;
