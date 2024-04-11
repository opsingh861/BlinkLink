import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';

export const fetchLinks = createAsyncThunk(
  'links/fetchLinks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/links/getlinks', {
        withCredentials: true,
      });
      return response.data.links;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const linksSlice = createSlice({
  name: 'links',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLinks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchLinks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export default linksSlice.reducer;
