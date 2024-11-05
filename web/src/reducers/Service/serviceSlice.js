import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { secureInstance } from "../../axios/config";

const initialState = {
  services: [],
  count: 0,
  selectedService: null,
  loading: false,
  message: {
    type: "Error",
    title: null,
  },
};

export const fetchServices = createAsyncThunk(
  "service/fetchServices",
  async (data, { rejectWithValue }) => {
    try {
      let url = "/api/service/";

      if (data) {
        if (data.limit) {
          url += `?limit=${data.limit}&offset=${data.offset || 0}`;

          if (data.search) {
            url += `&search=${data.search}`;
          }

          if (data.filter) {
            if (data.specialities.length > 0)
              url += `&specialities=${data.specialities.join(",")}`;
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

export const fetchServicesBySpeciality = createAsyncThunk(
  "speciality/fetchServicesBySpeciality",
  async (specialityIds, { rejectWithValue }) => {
    try {
      let url = `/api/service/specialities?speciality_ids=${specialityIds.join(
        ","
      )}`;

      const response = await secureInstance.request({
        url,
        method: "GET",
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchServiceById = createAsyncThunk(
  "service/fetchServiceById",
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/service/${serviceId}/`,
        method: "GET",
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createService = createAsyncThunk(
  "service/createService",
  async (data, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: "/api/service/",
        method: "POST",
        data,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateService = createAsyncThunk(
  "service/updateService",
  async ({ serviceId, data }, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/service/${serviceId}/`,
        method: "PATCH",
        data,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteService = createAsyncThunk(
  "service/deleteService",
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/service/${serviceId}/`,
        method: "DELETE",
      });

      return { ...response.data, id: serviceId };
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const bulkDeleteServices = createAsyncThunk(
  "service/bulkDeleteServices",
  async (ids, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/service/bulk-delete/`,
        method: "DELETE",
        data: { ids },
      });

      return { ...response.data, ids };
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    resetServiceMessage: (state) => {
      state.message = {
        type: "Error",
        title: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(bulkDeleteServices.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(bulkDeleteServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter(
          (service) => !action.payload.ids.includes(service.id)
        );
        state.count = state.count - action.payload.ids.length;
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(bulkDeleteServices.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.limit) {
          const { results, count } = action.payload.data;
          state.services = results || [];
          state.count = count;
        } else {
          state.services = action.payload.data || [];
        }
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(fetchServicesBySpeciality.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(fetchServicesBySpeciality.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.data || [];
      })
      .addCase(fetchServicesBySpeciality.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedService = action.payload;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.services.push(action.payload.data);
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        const updatedServiceIndex = state.services.findIndex(
          (service) => service.id === action.payload.data.id
        );
        if (updatedServiceIndex !== -1) {
          state.services[updatedServiceIndex] = action.payload.data;
          state.selectedService = action.payload;
        }
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter(
          (service) => service.id !== action.payload.id
        );
        state.selectedService = null;
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      });
  },
});

export const { resetServiceMessage } = serviceSlice.actions;

export default serviceSlice.reducer;
