import { configureStore } from "@reduxjs/toolkit";
import exerciseControl from "../context/exerciseControl";

export default configureStore({
    reducer: {
        exerciseControl: exerciseControl,
    },
});
