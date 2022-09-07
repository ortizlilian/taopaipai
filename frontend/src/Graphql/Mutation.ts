import {gql} from "@apollo/client";

export const CREATE_NEWSLETTER = gql `
    mutation createNewsletter($name: String! $email: String!) {
        createNewsletter(name: $name, email: $email) {
            successful
            message
        }
    }
`;

export const CREATE_CONTACT_MESSAGE = gql `
    mutation createContactMessage($name: String! $email: String! $message: String!) {
        createContactMessage(name: $name, email: $email, message: $message) {
            successful
            message
        }
    }
`;