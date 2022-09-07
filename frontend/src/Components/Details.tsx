import React  from 'react';
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import {
    setNameValue,
    setDefaultSetsCountValue,
    setDefaultRepsCountValue,
} from "../context/exerciseControl";

import "../styles/components/Details.css";

const Details = (props: any) => {
    const exerciseControl = useSelector((state: any) => state.exerciseControl);
    const dispatch = useDispatch();

    const closeExercise = () => {
        dispatch(setNameValue("none"));
        dispatch(setDefaultSetsCountValue(1));
        dispatch(setDefaultRepsCountValue(0));
        props.exercise.completed = false;
        props.exercise.break = false;
        props.exercise.countSets = 1;
        props.exercise.countReps = 0;
    };

    return (
        <>
            <div id="component-details">
                <Button variant="contained" onClick={() => {closeExercise();}}>
                    X
                </Button>
                <ul>
                    <li className="">{exerciseControl.name}</li>
                    <li className="">Set Number: {exerciseControl.setCount}</li>
                    <li className="">Reps Counting: {exerciseControl.repsCount}</li>
                </ul>
                <div className="clear"></div>
            </div>
        </>
    )
};

export default Details;