"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_EXERCISE = exports.UPDATE_EXERCISE = exports.CREATE_EXERCISE = void 0;
const graphql_1 = require("graphql");
const Exercise_1 = require("../TypeDefinitions/Exercise");
const Message_1 = require("../TypeDefinitions/Message");
const Exercise_2 = require("../../Entities/Exercise");
exports.CREATE_EXERCISE = {
    type: Exercise_1.ExerciseType,
    args: {
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
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, sets, reps, break_time, pose_landmark_model } = args;
            yield Exercise_2.Exercise.insert({ name, sets, reps, break_time, pose_landmark_model });
            return args;
        });
    }
};
exports.UPDATE_EXERCISE = {
    type: Message_1.MessageType,
    args: {
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
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, sets, reps, break_time, pose_landmark_model } = args;
            const exercise = yield Exercise_2.Exercise.findOne({
                where: {
                    id: id
                }
            });
            if (exercise) {
                yield Exercise_2.Exercise.update({
                    id: id
                }, { name: name, sets: sets, reps: reps, break_time: break_time, pose_landmark_model: pose_landmark_model });
                return { successful: true, message: "exercise updated" };
            }
            else {
                throw new Error("This is a custom error");
            }
        });
    }
};
exports.DELETE_EXERCISE = {
    type: Message_1.MessageType,
    args: {
        id: {
            type: graphql_1.GraphQLID
        }
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = args.id;
            if (id === null) {
                throw new Error("This is a custom error");
            }
            yield Exercise_2.Exercise.delete(id);
            return { successful: true, message: "exercise deleted" };
        });
    }
};
