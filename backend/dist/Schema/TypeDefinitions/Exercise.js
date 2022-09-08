"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseType = void 0;
const graphql_1 = require("graphql");
exports.ExerciseType = new graphql_1.GraphQLObjectType({
    name: "Exercise",
    fields: () => ({
        id: {
            type: graphql_1.GraphQLID
        },
        name: {
            type: graphql_1.GraphQLString
        },
        sets: {
            type: graphql_1.GraphQLInt
        },
        reps: {
            type: graphql_1.GraphQLInt
        },
        break_time: {
            type: graphql_1.GraphQLInt
        },
        pose_landmark_model: {
            type: graphql_1.GraphQLString
        }
    })
});
