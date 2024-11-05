/* eslint-disable no-useless-catch */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance, secureInstance } from "../../axios/config";
import { setCookie } from "../../utilities/utils";

const initialState = {
  user: {
    accessToken: null,
    email: "",
    name: "",
    isVerified: false,
    role: "",
    userImage: null,
  },
  isRegistered: false,
  isLoggedInState: false,
  isEmailSent: false,
  loading: false,
  message: {
    type: "Error",
    title: null,
  },
};

export const handleRegister = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance.request({
        url: "/api/users/",
        method: "POST",
        data,
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const handleLogin = createAsyncThunk(
  "auth/login",
  async ({ data, router }, { rejectWithValue }) => {
    try {
      const response = await instance.request({
        url: "/api/auth/token",
        method: "POST",
        data,
      });

      setCookie(
        "refresh_token",
        response.data.refresh_token,
        response.data.expires_in
      );

      return { ...response.data, router };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance.request({
        url: "/api/auth/token",
        method: "POST",
        data,
      });

      setCookie(
        "refresh_token",
        response.data.refresh_token,
        response.data.expires_in
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAuthenticatedUser = createAsyncThunk(
  "auth/authenticatedUser",
  async () => {
    const response = await secureInstance.request({
      url: "/api/users/me/",
      method: "GET",
    });

    return response.data;
  }
);

export const handleLogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      setCookie("refresh_token", "", -1);
      window.location.pathname = "/login";
      return true;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance.request({
        url: "/api/password-reset/",
        method: "POST",
        data,
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const recoverPassword = createAsyncThunk(
  "auth/recoverPassword",
  async ({ data, router }, { rejectWithValue }) => {
    try {
      const response = await instance.request({
        url: "/api/password-reset/confirm/",
        method: "POST",
        data,
      });

      router.push("/login");

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleResgisterationStatus: (state) => {
      state.isRegistered = false;
    },
    handleLoginStatus: (state, action) => {
      state.isLoggedInState = action.payload;
    },
    handleWelcomeUserAlert: (state, action) => {
      state.isWelcomeUserAlert = action.payload;
    },
    resetAuthMessage: (state) => {
      state.message = {
        type: "Error",
        title: null,
      };
    },
    setAuthMessage: (state, action) => {
      state.message.title = action.payload.title;
      state.message.type = action.payload.type;
    },
    setIsEmailSent: (state, action) => {
      state.isEmailSent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.loading = false;
        const { router } = action.payload;
        state.user.accessToken = action.payload.access_token;
        state.isLoggedInState = true;
        state.message.title = "Logged In Successfully";
        state.message.type = "Success";
        router.push("/admin");
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(handleRegister.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(handleRegister.fulfilled, (state) => {
        state.loading = false;
        state.isRegistered = true;
        state.isWelcomeUserAlert = true;
        state.message.title = "Account is created successfully";
        state.message.type = "Success";
      })
      .addCase(handleRegister.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user.accessToken = action.payload.access_token;
        state.isLoggedInState = true;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.user.accessToken = null;
        state.isLoggedInState = false;
        state.message.title = action.payload;
        state.message.type = "Error";
        setCookie("refresh_token", "", -1);

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      })
      .addCase(getAuthenticatedUser.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(getAuthenticatedUser.fulfilled, (state, action) => {
        state.loading = false;
        const { data } = action.payload;
        state.user.email = data.email;
        state.user.name = data.user_name;
        state.user.isVerified = data.is_verified;
        state.user.role = data.role_type;
        state.user.userImage = data.picture;
      })
      .addCase(getAuthenticatedUser.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(handleLogout.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(handleLogout.fulfilled, (state) => {
        state.loading = false;
        state.user.accessToken = null;
        state.isLoggedInState = false;
        state.message.title = "Logged Out Successfully";
        state.message.type = "Success";
      })
      .addCase(handleLogout.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isEmailSent = true;
        state.message.title = "Email is sent successfully. Check your mailbox.";
        state.message.type = "Success";
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload.email[0];
        state.message.type = "Error";
      })
      .addCase(recoverPassword.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(recoverPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message.title = "Your password is updated successfully.";
        state.message.type = "Success";
      })
      .addCase(recoverPassword.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      });
  },
});

export const {
  handleResgisterationStatus,
  handleLoginStatus,
  handleWelcomeUserAlert,
  resetAuthMessage,
  setIsEmailSent,
  setAuthMessage,
} = authSlice.actions;

export default authSlice.reducer;
