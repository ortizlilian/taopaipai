import {GraphQLString} from "graphql";
import {MessageType} from "../TypeDefinitions/Message";
import SES from "aws-sdk/clients/ses";
import AWS from "aws-sdk/global";

const accessKeyId = process.env.ACCESS_KEY_ID || "";
const secretAccessKey = process.env.SECRET_ACCESS_KEY || "";
const serverEmail = process.env.SERVER_EMAIL || "taopaipai.ai@gmail.com";

AWS.config.update({
    region: "us-west-2",
    apiVersion: "latest",
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
});

export const CREATE_CONTACT_MESSAGE = {
    type: MessageType,
    args: {
        name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        message: {
            type: GraphQLString
        },
    },
    async resolve(parent : any, args : any) {
        const {name, email, message} = args;
        
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

        let sendPromise = new SES({ apiVersion: "2010-12-01" })
        .sendEmail(params)
        .promise();

        await sendPromise
        .then(function () {
            console.log("SES message sent!");
        })
        .catch(function (err) {
            throw new Error(err.message);
        });

        return {successful: true, message: "Thanks for your message!"}
    }
};
