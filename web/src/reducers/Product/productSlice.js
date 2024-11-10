import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/config";

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post("/api/products", formData);
      dispatch(getProducts());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, productData }, { rejectWithValue, dispatch }) => {
    try {
      console.log("Received id:", id);
      console.log("Received productData:", productData);

      if (!productData || !(productData instanceof FormData)) {
        throw new Error("Invalid product data provided.");
      }

      const response = await axios.put(`/api/products/${id}`, productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(getProducts());
      return response.data;
    } catch (error) {
      console.error("Error in updateProduct thunk:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      dispatch(getProducts());
      return productId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
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
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
