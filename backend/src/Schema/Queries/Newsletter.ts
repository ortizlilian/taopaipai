import {GraphQLList} from "graphql";
import {NewsletterType} from "../TypeDefinitions/Newsletter";
import {Newsletter} from "../../Entities/Newsletter";

export const GET_ALL_NEWSLETTER = {
    type: new GraphQLList(NewsletterType),
    resolve() {
        return Newsletter.find();
    }
};
