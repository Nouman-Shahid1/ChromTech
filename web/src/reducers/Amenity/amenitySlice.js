import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { secureInstance } from "../../axios/config";

const initialState = {
  amenities: [],
  count: 0,
  selectedAmenity: null,
  loading: false,
  message: {
    type: "Error",
    title: null,
  },
};

export const fetchAmenities = createAsyncThunk(
  "amenity/fetchAmenities",
  async (data, { rejectWithValue }) => {
    try {
      let url = "/api/amenity/";

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

export const createAmenity = createAsyncThunk(
  "amenity/createAmenity",
  async (data, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: "/api/amenity/",
        method: "POST",
        data,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateAmenity = createAsyncThunk(
  "amenity/updateAmenity",
  async ({ amenityId, data }, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/amenity/${amenityId}/`,
        method: "PATCH",
        data,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteAmenity = createAsyncThunk(
  "amenity/deleteAmenity",
  async (amenityId, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/amenity/${amenityId}/`,
        method: "DELETE",
      });

      return { ...response.data, id: amenityId };
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const bulkDeleteAmenities = createAsyncThunk(
  "amenity/bulkDeleteAmenities",
  async (ids, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/amenity/bulk-delete/`,
        method: "DELETE",
        data: { ids },
      });

      return { ...response.data, ids };
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const amenitySlice = createSlice({
  name: "amenity",
  initialState,
  reducers: {
    resetAmenityMessage: (state) => {
      state.message = {
        type: "Error",
        title: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAmenities.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(fetchAmenities.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.limit) {
          const { results, count } = action.payload.data;
          state.amenities = results || [];
          state.count = count;
        } else {
          state.amenities = action.payload.data || [];
        }
      })
      .addCase(fetchAmenities.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(createAmenity.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(createAmenity.fulfilled, (state, action) => {
        state.loading = false;
        state.amenities.push(action.payload.data);
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(createAmenity.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(updateAmenity.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(updateAmenity.fulfilled, (state, action) => {
        state.loading = false;
        const updatedAmenityIndex = state.amenities.findIndex(
          (amenity) => amenity.id === action.payload.data.id
        );
        if (updatedAmenityIndex !== -1) {
          state.amenities[updatedAmenityIndex] = action.payload.data;
          state.selectedAmenity = action.payload.data;
        }
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(updateAmenity.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(deleteAmenity.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(deleteAmenity.fulfilled, (state, action) => {
        state.loading = false;
        state.amenities = state.amenities.filter(
          (amenity) => amenity.id !== action.payload.id
        );
        state.selectedAmenity = null;
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(deleteAmenity.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(bulkDeleteAmenities.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(bulkDeleteAmenities.fulfilled, (state, action) => {
        state.loading = false;
        state.amenities = state.amenities.filter(
          (amenity) => !action.payload.ids.includes(amenity.id)
        );
        state.count = state.count - action.payload.ids.length;
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(bulkDeleteAmenities.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      });
  },
});

export const { resetAmenityMessage } = amenitySlice.actions;

export default amenitySlice.reducer;
