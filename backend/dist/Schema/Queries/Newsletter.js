"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_ALL_NEWSLETTER = void 0;
const graphql_1 = require("graphql");
const Newsletter_1 = require("../TypeDefinitions/Newsletter");
const Newsletter_2 = require("../../Entities/Newsletter");
exports.GET_ALL_NEWSLETTER = {
    type: new graphql_1.GraphQLList(Newsletter_1.NewsletterType),
    resolve() {
        return Newsletter_2.Newsletter.find();
    }
};
