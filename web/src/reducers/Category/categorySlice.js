import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const createCategory= createAsyncThunk(
    "category/createCategory",
    async(categoryData,{rejectWithVAlue})=>{
        try {
            const response = await axios.post("/api/categories/",categoryData);
            return response.data;
        } catch (error) {
            return rejectWithVAlue(error.response.data)
        }
    }
);
export const getCategories =createAsyncThunk(
    "category/getCategories",
    async(_,{rejectWithVAlue})=>{
        try {
            const response =await axios.get("/api/categories");
            return response.data;
        } catch (error) {
            return rejectWithVAlue(error.response.data)
        }
    }
)
export const getCategoryById= createAsyncThunk(
    "category/getCategoryByid",
    async(categoryId, {rejectWithVAlue})=>{
        try {
            const response = await axios.get(`/api/categories/${categoryId}`);
            return response.data;
        } catch (error) {
            return rejectWithVAlue(error.response.data)
        }
    }
)

export const addSubCategory= createAsyncThunk(
    "category/add-subcategory",
    async({categoryId,subCategoryData},{rejectWithVAlue})=>{
        try {
            const response = await axios.post(`/api/categories/${categoryId}`,subCategoryData);
            return response.data;
        } catch (error) {
            return rejectWithVAlue(error.response.data)
        }
    }
);
export const deleteCategory=createAsyncThunk(
    'category/deleteCategory',
    async(categoryId,{rejectWithVAlue})=>{
        try {
            const reponse=await axios.delete(`/api/categories/${categoryId}`)
            return response.data
        } catch (error) {
            return rejectWithVAlue(error.response.data)
        }
    }
);
export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async ({ categoryId, updatedCategoryData }, { rejectWithValue }) => {
      try {
        const response = await axios.put(`/api/categories/${categoryId}`, updatedCategoryData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const categorySlice = createSlice({
    name:"category",
    initialState:{
        categories:[],
        loading:false,
        error:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //handle createCategory
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
        //handle getCategories
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
        //handle getCategoryById
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
        //handle addSubCategory
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
        //handle deleteCategory
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