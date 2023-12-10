import { GraphQLBoolean, GraphQLString } from "graphql";

export const idArg = { type: GraphQLString };

export const todoArgs = {
    id: idArg,
    text: { type: GraphQLString },
    finished: { type: GraphQLBoolean },
};