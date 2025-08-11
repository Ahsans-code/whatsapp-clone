// frontend/src/redux/messageSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../main";

// This is our new async action
export const fetchMessages = createAsyncThunk(
    'message/fetchMessages',
    async (selectedUserId, { rejectWithValue }) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.get(`${BASE_URL}/api/v1/message/${selectedUserId}`);
            return res.data;
        } catch (error) {
            // Use rejectWithValue to pass the error message to the reducer
            return rejectWithValue(error.response.data);
        }
    }
);

const messageSlice = createSlice({
    name: "message",
    initialState: {
        messages: [],
        loading: false, // <-- ADD THIS
    },
    reducers: {
        // This is for real-time messages from sockets
        setMessages: (state, action) => {
            state.messages = action.payload;
        }
    },
    // This handles the states of our async action
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.loading = true; // Set loading to true when the request starts
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.loading = false; // Set loading to false on success
                state.messages = action.payload; // Update messages with fetched data
            })
            .addCase(fetchMessages.rejected, (state) => {
                state.loading = false; // Set loading to false on failure
                state.messages = []; // Optionally clear messages on error
            });
    }
});

export const { setMessages } = messageSlice.actions;
export default messageSlice.reducer;