"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const Exercise_1 = require("./Queries/Exercise");
const Exercise_2 = require("./Mutations/Exercise");
const Newsletter_1 = require("./Queries/Newsletter");
const Newsletter_2 = require("./Mutations/Newsletter");
const Contact_1 = require("./Mutations/Contact");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getAllExercises: Exercise_1.GET_ALL_EXERCISES,
        getAllNewsletter: Newsletter_1.GET_ALL_NEWSLETTER
    }
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        createExercise: Exercise_2.CREATE_EXERCISE,
        deleteExercise: Exercise_2.DELETE_EXERCISE,
        updateExercise: Exercise_2.UPDATE_EXERCISE,
        createNewsletter: Newsletter_2.CREATE_NEWSLETTER,
        createContactMessage: Contact_1.CREATE_CONTACT_MESSAGE
    }
});
exports.schema = new graphql_1.GraphQLSchema({ query: RootQuery, mutation: Mutation });
