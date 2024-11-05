import { createSlice } from "@reduxjs/toolkit";
import { secureInstance } from "../../axios/config";

const initialState = {
  loading: false,
};

export const uploadMedia = async (folder, file) => {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("content_type", file.type);
    data.append("upload_folder", folder);

    const response = await secureInstance.request({
      url: "/api/shop/upload-media/",
      method: "POST",
      data,
    });

    return response.data.data.file_url;
  } catch (error) {
    console.log(error.response.data);
    return;
  }
};

export const deleteMedia = async (data) => {
  try {
    const response = await secureInstance.request({
      url: "/api/shop/delete-media/",
      method: "POST",
      data,
    });

    return response.data.status_code === 200;
  } catch (error) {
    console.log(error.response.data);
    return false;
  }
};

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    setMediaLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setMediaLoading } = mediaSlice.actions;

export default mediaSlice.reducer;
