import {GraphQLObjectType, GraphQLID} from "graphql"

export const NewsletterType = new GraphQLObjectType({
    name: "Newsletter",
    fields: () => (
        {
            id: {
                type: GraphQLID
            }
        }
    )
});
