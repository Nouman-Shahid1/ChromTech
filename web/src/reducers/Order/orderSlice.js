import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/config";

// Async Thunk for Saving an Order
export const saveOrder = createAsyncThunk(
  "order/saveOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/orders/create", orderData);
      return response.data.order;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk for Fetching User Orders
export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async (userEmail, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/orders/user-orders?email=${userEmail}`
      );
      return response.data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk for Deleting an Order
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/orders/${orderId}`);
      return orderId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Save Order
    builder
      .addCase(saveOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload);
      })
      .addCase(saveOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Get User Orders
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Delete Order
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
