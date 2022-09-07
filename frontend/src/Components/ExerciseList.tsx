import React  from 'react';
import "../styles/components/ExerciseList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setNameValue,
  setRepsValue,
  setSetValue,
} from "../context/exerciseControl";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useQuery } from "@apollo/client";
import { GET_ALL_EXERCISES } from "../Graphql/Queries";

const ExerciseList = (props: any) => {
  const exerciseControl = useSelector((state: any) => state.exerciseControl);
  const dispatch = useDispatch();
  const { data } = useQuery(GET_ALL_EXERCISES);

  const selectExercise = (exercise: any) => {
    dispatch(setNameValue(exercise.name));
    dispatch(setRepsValue(5));
    dispatch(setSetValue(2));

    // reset props
    props.exercise.break = false;
    props.exercise.maxReps = exercise.reps;
    props.exercise.maxSets = exercise.sets;
    props.exercise.countReps = 0;
    props.exercise.countSets = 1;
    props.exercise.completed = false;
    props.exercise.stage = "down";
    props.exercise.model = JSON.parse(exercise.pose_landmark_model);
  };

  return (
    <>
      {exerciseControl.name === "none" && (
        <div id="component-exerciseList">
          <h1>Select an exercise</h1>
          <nav aria-label="secondary mailbox folders">
            <List>
              {data?.getAllExercises?.length > 0 &&
                data.getAllExercises.map((item: any, index: any) => {
                  return (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          selectExercise(item);
                        }}
                      >
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
            </List>
          </nav>
          <div className="clear"></div>
        </div>
      )}
    </>
  );
};

export default ExerciseList;
