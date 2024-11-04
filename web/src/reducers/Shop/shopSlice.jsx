import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { secureInstance } from "../../axios/config";

const initialState = {
  shops: [],
  selectedShop: null,
  loading: false,
  message: {
    type: "Error",
    title: null,
  },
};

export const fetchShops = createAsyncThunk(
  "shop/fetchShops",
  async (data, { rejectWithValue }) => {
    try {
      let url = "/api/shop/";

      if (data) {
        if (data.limit) {
          url += `?limit=${data.limit}&offset=${data.offset || 0}`;

          if (data.search) {
            url += `&search=${data.search}`;
          }

          if (data.filter) {
            if (data.categories.length > 0)
              url += `&categories=${data.categories.join(",")}`;
            if (data.specialities.length > 0)
              url += `&specialities=${data.specialities.join(",")}`;
            if (data.services.length > 0)
              url += `&services=${data.services.join(",")}`;
            if (data.amenities.length > 0)
              url += `&amenities=${data.amenities.join(",")}`;
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
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchShopById = createAsyncThunk(
  "shop/fetchShopById",
  async (shopId, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/shop/${shopId}/`,
        method: "GET",
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createShop = createAsyncThunk(
  "shop/createShop",
  async ({ data, router }, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: "/api/shop/",
        method: "POST",
        data,
      });
      return { ...response.data, router };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateShop = createAsyncThunk(
  "shop/updateShop",
  async ({ shopId, data, router }, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/shop/${shopId}/`,
        method: "PATCH",
        data,
      });

      return { ...response.data, router };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteShop = createAsyncThunk(
  "shop/deleteShop",
  async (shopId, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/shop/${shopId}/`,
        method: "DELETE",
      });

      return { ...response.data, id: shopId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const bulkDeleteShops = createAsyncThunk(
  "shop/bulkDeleteShops",
  async (ids, { rejectWithValue }) => {
    try {
      const response = await secureInstance.request({
        url: `/api/shop/bulk-delete/`,
        method: "DELETE",
        data: { ids },
      });

      return { ...response.data, ids };
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setSelectedShop: (state, action) => {
      state.selectedShop = action.payload;
    },
    resetShopMessage: (state) => {
      state.message.title = null;
      state.message.type = "Error";
    },
    setShopMessage: (state, action) => {
      state.message.title = action.payload.title;
      state.message.type = action.payload.type;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShops.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.limit) {
          const { results, count } = action.payload.data;
          state.shops = results || [];
          state.count = count;
        } else {
          state.shops = action.payload.data || [];
        }
      })
      .addCase(fetchShops.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(fetchShopById.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(fetchShopById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedShop = action.payload.data;
      })
      .addCase(fetchShopById.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(createShop.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(createShop.fulfilled, (state, action) => {
        state.loading = false;
        const { router, data } = action.payload;
        state.shops.push(data);
        state.message.title = action.payload.message;
        state.message.type = "Success";
        router.push("/admin/shops");
      })
      .addCase(createShop.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(updateShop.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(updateShop.fulfilled, (state, action) => {
        state.loading = false;
        const { router } = action.payload;
        const updatedShopIndex = state.shops.findIndex(
          (shop) => shop.id === action.payload.data.id
        );
        if (updatedShopIndex !== -1) {
          state.shops[updatedShopIndex] = action.payload.data;
        }
        state.message.title = action.payload.message;
        state.message.type = "Success";
        router.push("/admin/shops");
      })
      .addCase(updateShop.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(deleteShop.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(deleteShop.fulfilled, (state, action) => {
        state.loading = false;
        state.shops = state.shops.filter(
          (shop) => shop.id !== action.payload.id
        );
        state.selectedShop = null;
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(deleteShop.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      })
      .addCase(bulkDeleteShops.pending, (state) => {
        state.loading = true;
        state.message.title = null;
      })
      .addCase(bulkDeleteShops.fulfilled, (state, action) => {
        state.loading = false;
        state.shops = state.shops.filter(
          (shop) => !action.payload.ids.includes(shop.id)
        );
        state.count = state.count - action.payload.ids.length;
        state.message.title = action.payload.message;
        state.message.type = "Success";
      })
      .addCase(bulkDeleteShops.rejected, (state, action) => {
        state.loading = false;
        state.message.title = action.payload;
        state.message.type = "Error";
      });
  },
});

export const { setSelectedShop, resetShopMessage, setShopMessage } =
  shopSlice.actions;

export default shopSlice.reducer;
