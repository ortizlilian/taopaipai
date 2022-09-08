"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterType = void 0;
const graphql_1 = require("graphql");
exports.NewsletterType = new graphql_1.GraphQLObjectType({
    name: "Newsletter",
    fields: () => ({
        id: {
            type: graphql_1.GraphQLID
        }
    })
});
