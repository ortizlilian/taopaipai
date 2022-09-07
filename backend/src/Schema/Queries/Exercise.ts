import {GraphQLList} from "graphql";
import {ExerciseType} from "../TypeDefinitions/Exercise";
import {Exercise} from "../../Entities/Exercise";

export const GET_ALL_EXERCISES = {
    type: new GraphQLList(ExerciseType),
    resolve() {
        return Exercise.find();
    }
};
