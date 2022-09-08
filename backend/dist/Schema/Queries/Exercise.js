"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_ALL_EXERCISES = void 0;
const graphql_1 = require("graphql");
const Exercise_1 = require("../TypeDefinitions/Exercise");
const Exercise_2 = require("../../Entities/Exercise");
exports.GET_ALL_EXERCISES = {
    type: new graphql_1.GraphQLList(Exercise_1.ExerciseType),
    resolve() {
        return Exercise_2.Exercise.find();
    }
};
