import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/config";
import { setCookie, getCookie, deleteCookie } from "../../utilities/utils";

let refreshRequestPending = false;

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  userRole: localStorage.getItem("userRole") || null,
  accessToken: getCookie("access_token") || null,
  loading: false,
  error: null,
  loggedOut: false,
};

// Async Thunk for User Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { access_token, refresh_token, expires_in, user } = response.data;

      // Store tokens and user data
      setCookie("access_token", access_token, expires_in);
      setCookie("refresh_token", refresh_token, expires_in);
      localStorage.setItem("access_token", access_token);

      return { access_token, user, userRole: user.role };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
  }
);

// Async Thunk for User Registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/register", userData);
      const { access_token, user } = response.data;

      // Store access token
      setCookie("access_token", access_token, 7 * 24 * 60 * 60);

      return { access_token, user, userRole: user.role };
    } catch (err) {
      if (!err.response) {
        console.error("Network error or server is not reachable.");
      } else {
        console.error("Error in registerUser thunk:", err.response);
      }
      return rejectWithValue(
        err.response?.data || { message: "Registration failed" }
      );
    }
  }
);

// Async Thunk for Refreshing Token
export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue, getState }) => {
    const { auth } = getState();
    if (
      !getCookie("refresh_token") ||
      auth.loggedOut ||
      refreshRequestPending
    ) {
      return rejectWithValue({ message: "No valid refresh token available" });
    }
    try {
      refreshRequestPending = true;
      const refresh_token = getCookie("refresh_token");
      const response = await axios.post("/api/auth/refresh", { refresh_token });
      const { access_token, expires_in } = response.data;

      // Update access token
      setCookie("access_token", access_token, expires_in);
      localStorage.setItem("access_token", access_token);

      refreshRequestPending = false;
      return { access_token };
    } catch (err) {
      refreshRequestPending = false;
      return rejectWithValue(
        err.response?.data || { message: "Token refresh failed" }
      );
    }
  }
);

// Async Thunk for Logging Out
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    localStorage.removeItem("access_token");

    dispatch(authSlice.actions.setLoggedOut(true));
    dispatch(authSlice.actions.clearState());
  }
);

// Redux Slice for Authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.userRole = action.payload.userRole;
    },
    clearState: (state) => {
      state.user = null;
      state.userRole = null;
      state.accessToken = null;
      state.loading = false;
      state.error = null;

      // Clear local storage
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");
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
        state.userRole = action.payload.userRole;
        state.accessToken = action.payload.access_token;
        state.loggedOut = false;

        // Store user information in local storage
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("userRole", action.payload.userRole);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.userRole = action.payload.userRole;
        state.accessToken = action.payload.access_token;
        state.loggedOut = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.userRole = null;
        state.accessToken = null;
        state.loggedOut = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.accessToken = null;
      });
  },
});

export const { setToken, setUser, clearState, setLoggedOut } =
  authSlice.actions;
export default authSlice.reducer;
