import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_EXERCISES } from "./Queries/Exercise";
import { CREATE_EXERCISE, DELETE_EXERCISE, UPDATE_EXERCISE } from "./Mutations/Exercise";
import { GET_ALL_NEWSLETTER } from "./Queries/Newsletter";
import { CREATE_NEWSLETTER } from "./Mutations/Newsletter";
import { CREATE_CONTACT_MESSAGE } from "./Mutations/Contact";

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getAllExercises: GET_ALL_EXERCISES,
        getAllNewsletter: GET_ALL_NEWSLETTER
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createExercise: CREATE_EXERCISE,
        deleteExercise: DELETE_EXERCISE,
        updateExercise: UPDATE_EXERCISE,
        createNewsletter: CREATE_NEWSLETTER,
        createContactMessage: CREATE_CONTACT_MESSAGE
    }
});

export const schema = new GraphQLSchema({query: RootQuery, mutation: Mutation});
