import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axiosInstance';

export const fetchQrs = createAsyncThunk(
    'qr/fetchQrs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/qr/getQrs', {
                withCredentials: true,
            });
            return response.data.qrCodes;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const qrSlice = createSlice({
    name: 'qrs',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQrs.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchQrs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchQrs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message;
            });
    },
});

export default qrSlice.reducer;
