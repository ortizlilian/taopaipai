import {GraphQLString} from "graphql";
import {MessageType} from "../TypeDefinitions/Message";
import {Newsletter} from "../../Entities/Newsletter";

export const CREATE_NEWSLETTER = {
    type: MessageType,
    args: {
        name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        }
    },
    async resolve(parent : any, args : any) {
        const {name, email} = args;
        
        if(name === "" || name.length < 2 || email === "" || !email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            throw new Error("Please, double check your name and/or email");
        }
        
        await Newsletter.insert({name, email});
        return {successful: true, message: "Thanks for subscribing!"}
    }
};
