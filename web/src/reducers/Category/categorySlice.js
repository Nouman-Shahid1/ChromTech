import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { secureInstance } from "../../axios/config";

const initialState = {
  categories: [],
  count: 0,
  selectedCategory: null,
  loading: false,
  message: {
    type: "Error",
    title: null,
  },
};

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (data, { rejectWithValue }) => { 
    try {
      let url = "/api/category"; 
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

export const fetchCategoryById = createAsyncThunk(
  "category/fetchCategoryById",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/category/${categoryId}/`,
        method: "GET",
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: "/api/category/",
        method: "POST",
        data,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ categoryId, data }, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/category/${categoryId}/`,
        method: "PATCH",
        data,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/category/${categoryId}/`,
        method: "DELETE",
      });

      return { ...response.data, id: categoryId };
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const bulkDeleteCategory = createAsyncThunk(
  "category/bulkDeleteCategory",
  async (ids, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/category/bulk-delete/`,
        method: "DELETE",
        data: { ids },
      });

      return { ...response.data, ids };
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetCategoryMessage: (state) => {
      state.message = {
        type: "Error",
        title: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.limit) {
          const { results, count } = action.payload.data;
          state.categories = results || [];
          state.count = count;
        } else {
          state.categories = action.payload.data || [];
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (state.categories.length < 10)
          state.categories.push(action.payload.data);
        state.count = state.count + 1;
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCategoryIndex = state.categories.findIndex(
          (category) => category.id === action.payload.data.id
        );
        if (updatedCategoryIndex !== -1) {
          state.categories[updatedCategoryIndex] = action.payload.data;
        }
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload.id
        );
        state.count = state.count - 1;
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(bulkDeleteCategory.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(bulkDeleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (category) => !action.payload.ids.includes(category.id)
        );
        state.count = state.count - action.payload.ids.length;
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(bulkDeleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      });
  },
});

export const { resetCategoryMessage } = categorySlice.actions;

export default categorySlice.reducer;
