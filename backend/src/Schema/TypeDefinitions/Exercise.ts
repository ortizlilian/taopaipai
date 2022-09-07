import {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt} from "graphql"

export const ExerciseType = new GraphQLObjectType({
    name: "Exercise",
    fields: () => (
        {
            id: {
                type: GraphQLID
            },
            name: {
                type: GraphQLString
            },
            sets: {
                type: GraphQLInt
            },
            reps: {
                type: GraphQLInt
            },
            break_time: {
                type: GraphQLInt
            },
            pose_landmark_model: {
                type: GraphQLString
            }
        }
    )
});
