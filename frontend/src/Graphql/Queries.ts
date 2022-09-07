import {gql} from "@apollo/client";

export const GET_ALL_EXERCISES = gql `
    query getAllExercises {
        getAllExercises {
            id
            name
            sets
            reps
            pose_landmark_model
        }
    }
`;
