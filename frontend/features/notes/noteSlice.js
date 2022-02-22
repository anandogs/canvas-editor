import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  message: "",
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNote.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.notes.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;

      });
  },
});

// create new note
export const createNote = createAsyncThunk(
  "notes/create",
  async (noteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.createNote(noteData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update note
export const updateNote = createAsyncThunk(
  "notes/update",
  async (dispatchData, thunkAPI) => {
    const updateId = dispatchData[0]
    const noteData = dispatchData[1]
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.updateNote(updateId, noteData, token);
      
    } catch (error) {
      console.log(error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        console.long(message)
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get user notes
export const getNotes = createAsyncThunk(
  "notes/getall",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getNotes(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
