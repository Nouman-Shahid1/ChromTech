import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { secureInstance, instance } from "../../axios/config";

const initialState = {
  specialities: [],
  count: 0,
  selectedSpeciality: null,
  loading: false,
  message: {
    type: "Error",
    title: null,
  },
};

export const fetchSpecialities = createAsyncThunk(
  "speciality/fetchSpecialities",
  async (data, { rejectWithValue }) => {
    try {
      let url = "/api/speciality/";

      if (data) {
        if (data.limit) {
          url += `?limit=${data.limit}&offset=${data.offset || 0}`;

          if (data.search) {
            url += `&search=${data.search}`;
          }

          if (data.filter) {
            if (data.categories.length > 0)
              url += `&categories=${data.categories.join(",")}`;
          }
        }
      }

      const response = await secureInstance.request({
        url,
        method: "GET",
      });
      return { ...response.data, limit: data?.limit };
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchSpecialitiesByCategory = createAsyncThunk(
  "speciality/fetchSpecialitiesByCategory",
  async (categoryIds, { rejectWithValue }) => {
    try {
      let url = `/api/speciality/categories/?category_ids=${categoryIds.join(
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

export const createSpeciality = createAsyncThunk(
  "speciality/createSpeciality",
  async (data, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: "/api/speciality/",
        method: "POST",
        data,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateSpeciality = createAsyncThunk(
  "speciality/updateSpeciality",
  async ({ specialityId, data }, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/speciality/${specialityId}/`,
        method: "PATCH",
        data,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteSpeciality = createAsyncThunk(
  "speciality/deleteSpeciality",
  async (specialityId, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/speciality/${specialityId}/`,
        method: "DELETE",
      });

      return { ...response.data, id: specialityId };
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const bulkDeleteSpecialities = createAsyncThunk(
  "speciality/bulkDeleteSpecialities",
  async (ids, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/speciality/bulk-delete/`,
        method: "DELETE",
        data: { ids },
      });

      return { ...response.data, ids };
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const specialitySlice = createSlice({
  name: "speciality",
  initialState,
  reducers: {
    resetSpecialityMessage: (state) => {
      state.message = {
        type: "Error",
        title: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialities.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(bulkDeleteSpecialities.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(bulkDeleteSpecialities.fulfilled, (state, action) => {
        state.loading = false;
        state.specialities = state.specialities.filter(
          (speciality) => !action.payload.ids.includes(speciality.id)
        );
        state.count = state.count - action.payload.ids.length;
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(bulkDeleteSpecialities.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(fetchSpecialities.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.limit) {
          const { results, count } = action.payload.data;
          state.specialities = results || [];
          state.count = count;
        } else {
          state.specialities = action.payload.data || [];
        }
      })
      .addCase(fetchSpecialities.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(fetchSpecialitiesByCategory.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(fetchSpecialitiesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.specialities = action.payload.data || [];
      })
      .addCase(fetchSpecialitiesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(createSpeciality.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(createSpeciality.fulfilled, (state, action) => {
        state.loading = false;
        state.specialities.push(action.payload.data);
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(createSpeciality.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(updateSpeciality.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(updateSpeciality.fulfilled, (state, action) => {
        state.loading = false;
        const updatedSpecialityIndex = state.specialities.findIndex(
          (speciality) => speciality.id === action.payload.data.id
        );
        if (updatedSpecialityIndex !== -1) {
          state.specialities[updatedSpecialityIndex] = action.payload.data;
          state.selectedSpeciality = action.payload;
        }
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(updateSpeciality.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(deleteSpeciality.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(deleteSpeciality.fulfilled, (state, action) => {
        state.loading = false;
        state.specialities = state.specialities.filter(
          (speciality) => speciality.id !== action.payload.id
        );
        state.selectedSpeciality = null;
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(deleteSpeciality.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      });
  },
});

export const { resetSpecialityMessage } = specialitySlice.actions;

export default specialitySlice.reducer;
