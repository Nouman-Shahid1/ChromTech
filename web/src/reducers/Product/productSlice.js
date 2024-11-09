import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/products", productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, { rejectWithValue})=>{
    try {
      const response = await axios.get("/api/products");
      return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data);
  }
 }
);

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      return response.data;
    } catch (error){
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/products/${id}`, productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, {rejectWithValue})=>{
    try {
      const response = await axios.delete(`/api/products/${id}`);
      return id; // Without it, the application might not know which item to remove from the state
  } catch(err){
    return rejectWithValue(error.response?.data);
  }
}
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
    })
      .addCase(updateProduct.rejected, (state, action) =>{
       state.loading = false;
       state.error = action.payload;

    })
     .addCase(deleteProduct.pending, (state)=>{
      state.loading = true;
      state.error = null;
    })
     .addCase(deleteProduct.fulfilled, (state, action)=>{
      state.loading = false;
      state.products = state.products.filter((product) => product.id !== action.payload);

    })
     .addCase(deleteProduct.rejected, (state, action) =>{
      state.loading =  false;
      state.error = action.payload;
     });
    
  },
});



export default productSlice.reducer;
