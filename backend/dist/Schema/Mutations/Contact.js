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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATE_CONTACT_MESSAGE = void 0;
const graphql_1 = require("graphql");
const Message_1 = require("../TypeDefinitions/Message");
const ses_1 = __importDefault(require("aws-sdk/clients/ses"));
const global_1 = __importDefault(require("aws-sdk/global"));
const accessKeyId = process.env.ACCESS_KEY_ID || "";
const secretAccessKey = process.env.SECRET_ACCESS_KEY || "";
const serverEmail = process.env.SERVER_EMAIL || "taopaipai.ai@gmail.com";
global_1.default.config.update({
    region: "us-west-2",
    apiVersion: "latest",
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
});
exports.CREATE_CONTACT_MESSAGE = {
    type: Message_1.MessageType,
    args: {
        name: {
            type: graphql_1.GraphQLString
        },
        email: {
            type: graphql_1.GraphQLString
        },
        message: {
            type: graphql_1.GraphQLString
        },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, message } = args;
            if (name.length < 2 || name.match(/^[a-z]+$/i)) {
                throw new Error("Please, double check your name");
            }
            if (email === "" || !email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
                throw new Error("Please, double check your email");
            }
            if (message.length < 50) {
                throw new Error("Please, double check your message, it must have at least 50 characters");
            }
            let params = {
                Destination: {
                    CcAddresses: [],
                    ToAddresses: [serverEmail],
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: "UTF-8",
                            Data: message,
                        },
                        Text: {
                            Charset: "UTF-8",
                            Data: message,
                        },
                    },
                    Subject: {
                        Charset: "UTF-8",
                        Data: "Tao Pai Pai - [" + name + "]",
                    },
                },
                Source: serverEmail,
                ReplyToAddresses: [email],
            };
            let sendPromise = new ses_1.default({ apiVersion: "2010-12-01" })
                .sendEmail(params)
                .promise();
            yield sendPromise
                .then(function () {
                console.log("SES message sent!");
            })
                .catch(function (err) {
                throw new Error(err.message);
            });
            return { successful: true, message: "Thanks for your message!" };
        });
    }
};
