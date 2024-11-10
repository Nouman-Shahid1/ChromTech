import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/config";

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (categoryData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post("/api/categories", categoryData);
      dispatch(getCategories());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/categories");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getCategoryById = createAsyncThunk(
  "category/getCategoryById",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addSubCategory = createAsyncThunk(
  "category/addSubCategory",
  async ({ categoryId, subCategoryData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `/api/categories/${categoryId}/subcategories`,
        subCategoryData
      );
      dispatch(getCategories());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (
    { categoryId, updatedCategoryData },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await axios.put(
        `/api/categories/${categoryId}`,
        updatedCategoryData
      );
      dispatch(getCategories());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`/api/categories/${categoryId}`);
      dispatch(getCategories());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSubCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
