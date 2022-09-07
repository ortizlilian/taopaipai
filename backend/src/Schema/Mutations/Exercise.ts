import {GraphQLID, GraphQLInt, GraphQLString} from "graphql";
import {ExerciseType} from "../TypeDefinitions/Exercise";
import {MessageType} from "../TypeDefinitions/Message";
import {Exercise} from "../../Entities/Exercise";

export const CREATE_EXERCISE = {
    type: ExerciseType,
    args: {
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
    },
    async resolve(parent : any, args : any) {
        const {name, sets, reps, break_time, pose_landmark_model} = args;
        await Exercise.insert({name, sets, reps, break_time, pose_landmark_model});
        return args;
    }
};

export const UPDATE_EXERCISE = {
    type: MessageType,
    args: {
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
    },
    async resolve(parent : any, args : any) {
        const {id, name, sets, reps, break_time, pose_landmark_model} = args;
        const exercise = await Exercise.findOne({
            where: {
                id: id
            }
        });

        if (exercise) {
            await Exercise.update({
                id: id
            }, {name: name, sets: sets, reps: reps, break_time: break_time, pose_landmark_model: pose_landmark_model});
            return {successful: true, message: "exercise updated"};
        } else {
            throw new Error("This is a custom error");
        }
    }
}

export const DELETE_EXERCISE = {
    type: MessageType,
    args: {
        id: {
            type: GraphQLID
        }
    },
    async resolve(parent : any, args : any) {
        const id = args.id;

        if (id === null) {
            throw new Error("This is a custom error");
        }

        await Exercise.delete(id);

        return {successful: true, message: "exercise deleted"}
    }
}
