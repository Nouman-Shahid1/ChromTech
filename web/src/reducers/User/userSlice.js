import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance, secureInstance } from "../../axios/config";

const initialState = {
  users: [],
  count: 0,
  selectedUser: null,
  shopOwners: [],
  loggedInUser: {},
  loading: false,
  message: {
    type: "Error",
    title: null,
  },
};

export const fetchShopOwners = createAsyncThunk(
  "users/fetchShopOwners",
  async (data, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: "/api/users/business-owners/",
        method: "GET",
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (data, { rejectWithValue }) => {
    try {
      let url = "/api/users";
      if (data) {
        if (data.limit) {
          url += `?limit=${data.limit}&offset=${data.offset || 0}`;

          if (data.search) {
            url += `&search=${data.search}`;
          }
        }
      }
      const response = await secureInstance.request({
        url,
        method: "GET",
      });

      return data && data?.limit
        ? { ...response.data, limit: data?.limit }
        : response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/users/${userId}/`,
        method: "GET",
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async ({ data, router }, { rejectWithValue }) => {
    try {
      const response = await instance.request({
        url: `/api/users/`,
        method: "POST",
        data,
      });

      return { ...response.data, router };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, data, router }, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/users/${userId}/`,
        method: "PATCH",
        data,
      });

      return { ...response.data, router };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/users/${userId}/`,
        method: "DELETE",
      });

      return { ...response.data, userId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const bulkDeleteUser = createAsyncThunk(
  "users/bulkDeleteUser",
  async (ids, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/users/bulk-delete/`,
        method: "DELETE",
        data: { ids },
      });

      return { ...response.data, ids };
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setUserMessage: (state, action) => {
      state.message.title = action.payload.title;
      state.message.type = action.payload.type;
    },
    resetUserMessage: (state) => {
      state.message = {
        type: "Error",
        title: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.limit) {
          const { results, count } = action.payload.data;
          state.users = results || [];
          state.count = count;
        } else {
          state.users = action.payload.data || [];
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload.data;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(fetchShopOwners.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(fetchShopOwners.fulfilled, (state, action) => {
        state.loading = false;
        state.shopOwners = action.payload.data;
      })
      .addCase(fetchShopOwners.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        const { router } = action.payload;
        if (state.users.length < 10) state.users.push(action.payload.data);
        state.count = state.count + 1;
        state.message.title = action.payload.message;
        state.message.type = "Success";
        router.push("/admin/users");
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const { router } = action.payload;
        const updatedUserIndex = state.users.findIndex(
          (user) => user.id === action.payload.data.id
        );
        if (updatedUserIndex !== -1) {
          state.users[updatedUserIndex] = action.payload.data;
        }
        state.message.title = action.payload.message;
        state.message.type = "Success";
        router.push("/admin/users");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(
          (user) => user.id !== action.payload.userId
        );
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(bulkDeleteUser.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(bulkDeleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(
          (user) => !action.payload.ids.includes(user.id)
        );
        state.count = state.count - action.payload.ids.length;
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(bulkDeleteUser.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      });
  },
});

export const { setSelectedUser, setUserMessage, resetUserMessage } =
  userSlice.actions;

export default userSlice.reducer;
