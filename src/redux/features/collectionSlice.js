import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPhotos, fetchVideos, fetchGIF } from "../../api/mediaApi";

export const fetchMedia = createAsyncThunk(
  "collection/fetchMedia",
  async ({ query, type, page }, { rejectWithValue }) => {
    try {
      if (type === "photos") {
        const data = await fetchPhotos(query, page, 15);
        return { type, results: data.results, page };
      }

      if (type === "videos") {
        const data = await fetchVideos(query, page, 15);
        return { type, results: data.videos, page };
      }

      if (type === "gifs") {
        const data = await fetchGIF(query, 16, page);
        return { type, results: data.data, page };
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    items: {
      photos: [],
      videos: [],
      gifs: [],
    },
    page: {
      photos: 1,
      videos: 1,
      gifs: 1,
    },
    status: {
      photos: "idle",
      videos: "idle",
      gifs: "idle",
    },
  },
  reducers: {
    resetTab: (state, action) => {
      const type = action.payload;
      state.items[type] = [];
      state.page[type] = 1;
    },
    nextPage: (state, action) => {
      const type = action.payload;
      state.page[type] += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedia.pending, (state, action) => {
        const type = action.meta.arg.type;
        state.status[type] = "loading";
      })
      .addCase(fetchMedia.fulfilled, (state, action) => {
        const { type, results, page } = action.payload;

        state.status[type] = "succeeded";

        if (page > 1) {
          state.items[type] = [...state.items[type], ...results];
        } else {
          state.items[type] = results;
        }
      })
      .addCase(fetchMedia.rejected, (state, action) => {
        const type = action.meta.arg.type;
        state.status[type] = "failed";
      });
  },
});

export const { nextPage, resetTab } = collectionSlice.actions;
export default collectionSlice.reducer;