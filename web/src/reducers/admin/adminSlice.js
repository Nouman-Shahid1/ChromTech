import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { secureInstance } from "../../axios/config";

const initialState = {
  adminHomeData: {
    category_count: 0,
    amenity_count: 0,
    service_count: 0,
    shops_count: 0,
    speciality_count: 0,
    city_count: 0,
  },
  loading: false,
  error: null,
};

export const fetchAdminHomeData = createAsyncThunk(
  "admin/fetchAdminHomeData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: "/api/users/admin-home/",
        method: "GET",
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.adminHomeData = action.payload.data;
      })
      .addCase(fetchAdminHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
