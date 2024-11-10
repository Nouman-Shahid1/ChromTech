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
    name:"category",
    initialState:{
        categories:[],
        loading:false,
        error,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createCategory.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(createCategory.fulfilled,(state,action)=>{
            state.loading=false;
            state.categories.push(action.payload);
        })
        .addCase(createCategory.rejected,(state,action)=>{
            state.loading=fasle;
            state.error=action.payload;
        })
        .addCase(getCategories.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(getCategories.fulfilled,(state,action)=>{
            state.loading=false;
            state.categories.push(action.payload);
        })
        .addCase(getCategories.rejected,(state,action)=>{
            state.loading=fasle;
            state.error=action.payload;
        })
        .addCase(getCategoryById.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(getCategoryById.fulfilled,(state,action)=>{
            state.loading=false;
            state.categories.push(action.payload);
        })
        .addCase(getCategoryById.rejected,(state,action)=>{
            state.loading=fasle;
            state.error=action.payload;
        })
        .addCase(addSubCategory.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(addSubCategory.fulfilled,(state,action)=>{
            state.loading=false;
            state.categories.push(action.payload);
        })
        .addCase(addSubCategory.rejected,(state,action)=>{
            state.loading=fasle;
            state.error=action.payload;
        })
        .addCase(deleteCategory.pending,(state)=>{
            state.loading=true;
            state.error=false;
        })
        .addCase(deleteCategory.fulfilled,(state,action)=>{
            state.loading=false;
            state.categories.push(action.payload);
        })
        .addCase(deleteCategory.rejected,(state,action)=>{
            state.loading=fasle;
            state.error=action.payload;
        })
       
        
    }
})
export default categorySlice.reducer