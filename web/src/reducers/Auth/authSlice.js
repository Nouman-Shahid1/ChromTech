import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/config";
import { setCookie, getCookie, deleteCookie } from "../../utilities/utils";

let refreshRequestPending = false; // Flag to avoid duplicate refresh requests

const initialState = {
  user: null,
  accessToken: getCookie("access_token") || null,
  loading: false,
  error: null,
  loggedOut: false, // Track logged-out state
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { access_token, refresh_token, expires_in, user } = response.data;

      setCookie("access_token", access_token, expires_in);
      setCookie("refresh_token", refresh_token, expires_in);
      localStorage.setItem("access_token", access_token);

      return { access_token, user };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue, getState }) => {
    const { auth } = getState();
    if (
      !getCookie("refresh_token") ||
      auth.loggedOut ||
      refreshRequestPending
    ) {
      // Exit if logged out, no refresh token, or another refresh is pending
      return rejectWithValue({ message: "No valid refresh token available" });
    }
    try {
      refreshRequestPending = true; // Set flag to avoid duplicate refresh
      const refresh_token = getCookie("refresh_token");
      const response = await axios.post("/api/auth/refresh", { refresh_token });
      const { access_token, expires_in } = response.data;

      setCookie("access_token", access_token, expires_in);
      localStorage.setItem("access_token", access_token);

      refreshRequestPending = false; // Reset flag after successful refresh
      return { access_token };
    } catch (err) {
      refreshRequestPending = false; // Reset flag on error
      return rejectWithValue(
        err.response?.data || { message: "Token refresh failed" }
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    localStorage.removeItem("access_token");

    dispatch(authSlice.actions.setLoggedOut(true)); // Mark as logged out
    dispatch(authSlice.actions.clearState());
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload;
    },
    clearState: (state) => {
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.error = null;
    },
    setLoggedOut: (state, action) => {
      state.loggedOut = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.access_token;
        state.loggedOut = false; // Reset logged-out state on login
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.loggedOut = true; // Set logged-out state
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.accessToken = null;
      });
  },
});

export const { setToken, clearState, setLoggedOut } = authSlice.actions;
export default authSlice.reducer;
