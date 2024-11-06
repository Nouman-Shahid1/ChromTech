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

// Async Thunks
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { access_token, refresh_token, expires_in, user } = response.data;

      // Store tokens in cookies/localStorage
      setCookie("access_token", access_token, expires_in);
      localStorage.setItem("access_token", access_token); // Optional storage

      return { access_token, user };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const refresh_token = getCookie("refresh_token");
      const response = await axios.post("/api/auth/refresh", { refresh_token });
      const { access_token, expires_in } = response.data;

      // Update access token cookie and localStorage
      setCookie("access_token", access_token, expires_in);
      localStorage.setItem("access_token", access_token); // Update in localStorage

      return { access_token };
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Token refresh failed" }
      );
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  deleteCookie("access_token");
  deleteCookie("refresh_token");
  localStorage.removeItem("access_token");
});

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
