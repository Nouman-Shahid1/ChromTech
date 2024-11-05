// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/config";
import { setCookie, getCookie, deleteCookie } from "../../utilities/utils";

const initialState = {
  user: null,
  accessToken: getCookie("access_token") || null,
  loading: false,
  error: null,
};

// Async Thunks for handling API calls
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", data);
      const { access_token, refresh_token, expires_in } = response.data;
      setCookie("access_token", access_token, expires_in);
      setCookie("refresh_token", refresh_token, expires_in);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/register", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const refresh_token = getCookie("refresh_token");
      const response = await axios.post("/api/auth/refresh", { refresh_token });
      setCookie(
        "access_token",
        response.data.access_token,
        response.data.expires_in
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  deleteCookie("access_token");
  deleteCookie("refresh_token");
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.access_token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.accessToken = null;
      });
  },
});

export default authSlice.reducer;
