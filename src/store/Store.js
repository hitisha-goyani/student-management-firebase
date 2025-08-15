import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "../store/StudentSlice"


const store = configureStore({
    reducer:{
        student:studentSlice,
    }
})

export default store;