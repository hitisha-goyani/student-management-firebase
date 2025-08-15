import { createSlice } from "@reduxjs/toolkit";
import { addData, deleteData, fetchData, updateData } from "./StudentThunk";


const studentSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add
      .addCase(addData.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      // Delete
      .addCase(deleteData.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (student) => student.id !== action.payload
        );
      })
      // Update
      .addCase(updateData.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          (student) => student.id === action.payload.id
        );
        if (index !== -1) {
          state.students[index] = {
            id: action.payload.id,
            ...action.payload.newData,
          };
        }
      });
  },
});

export default studentSlice.reducer;
