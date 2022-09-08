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
exports.CREATE_NEWSLETTER = void 0;
const graphql_1 = require("graphql");
const Message_1 = require("../TypeDefinitions/Message");
const Newsletter_1 = require("../../Entities/Newsletter");
exports.CREATE_NEWSLETTER = {
    type: Message_1.MessageType,
    args: {
        name: {
            type: graphql_1.GraphQLString
        },
        email: {
            type: graphql_1.GraphQLString
        }
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email } = args;
            if (name === "" || name.length < 2 || email === "" || !email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
                throw new Error("Please, double check your name and/or email");
            }
            yield Newsletter_1.Newsletter.insert({ name, email });
            return { successful: true, message: "Thanks for subscribing!" };
        });
    }
};
