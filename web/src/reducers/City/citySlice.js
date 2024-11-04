import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { secureInstance } from "../../axios/config";

const initialState = {
  cities: [],
  count: 0,
  selectedCity: null,
  loading: false,
  message: {
    type: "Error",
    title: null,
  },
};

export const fetchCities = createAsyncThunk(
  "city/fetchCities",
  async (data, { rejectWithValue }) => {
    try {
      let url = "/api/city/";

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

export const fetchCityById = createAsyncThunk(
  "city/fetchCityById",
  async (cityId, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/city/${cityId}/`,
        method: "GET",
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createCity = createAsyncThunk(
  "city/createCity",
  async (data, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: "/api/city/",
        method: "POST",
        data,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCity = createAsyncThunk(
  "city/updateCity",
  async ({ cityId, data }, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/city/${cityId}/`,
        method: "PATCH",
        data,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteCity = createAsyncThunk(
  "city/deleteCity",
  async (cityId, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/city/${cityId}/`,
        method: "DELETE",
      });

      return { ...response.data, id: cityId };
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const bulkDeleteCities = createAsyncThunk(
  "city/bulkDeleteCities",
  async (ids, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/city/bulk-delete/`,
        method: "DELETE",
        data: { ids },
      });

      return { ...response.data, ids };
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    resetCityMessage: (state) => {
      state.message = {
        type: "Error",
        title: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(bulkDeleteCities.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(bulkDeleteCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = state.cities.filter(
          (city) => !action.payload.ids.includes(city.id)
        );
        state.count = state.count - action.payload.ids.length;
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(bulkDeleteCities.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.limit) {
          const { results, count } = action.payload.data;
          state.cities = results || [];
          state.count = count;
        } else {
          state.cities = action.payload.data || [];
        }
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(fetchCityById.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(fetchCityById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCity = action.payload;
      })
      .addCase(fetchCityById.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(createCity.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(createCity.fulfilled, (state, action) => {
        state.loading = false;
        state.cities.push(action.payload.data);
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(createCity.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(updateCity.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(updateCity.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCityIndex = state.cities.findIndex(
          (city) => city.id === action.payload.data.id
        );
        if (updatedCityIndex !== -1) {
          state.cities[updatedCityIndex] = action.payload.data;
        }
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(updateCity.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(deleteCity.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = state.cities.filter(
          (city) => city.id !== action.payload.id
        );
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(deleteCity.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      });
  },
});

export const { resetCityMessage } = citySlice.actions;

export default citySlice.reducer;
