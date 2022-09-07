import { createSlice } from "@reduxjs/toolkit";

export const exerciseControl = createSlice({
    name: "exerciseControl",
    initialState: {
        break: false,
        completed: false,
        name: "none",
        id: 0,
        set: 0,
        reps: 0,
        setCount: 1,
        repsCount: 0,
    },
    reducers: {
        setBreakValue: (state, action) => {
            state.break = action.payload;
        },
        setNameValue: (state, action) => {
            state.name = action.payload;
        },
        setIdValue: (state, action) => {
            state.id = action.payload;
        },
        setSetValue: (state, action) => {
            state.set = action.payload;
        },
        setRepsValue: (state, action) => {
            state.reps = action.payload;
        },
        setSetsCountValue: (state, action) => {
            state.setCount++;
        },
        setRepsCountValue: (state, action) => {
            state.repsCount++;
        },
        setDefaultSetsCountValue: (state, action) => {
            state.setCount = 1;
        },
        setDefaultRepsCountValue: (state, action) => {
            state.repsCount = 0;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setBreakValue,
    setNameValue,
    setIdValue,
    setSetValue,
    setRepsValue,
    setSetsCountValue,
    setRepsCountValue,
    setDefaultSetsCountValue,
    setDefaultRepsCountValue,
} = exerciseControl.actions;

export default exerciseControl.reducer;
