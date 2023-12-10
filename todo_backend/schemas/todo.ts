import {GraphQLBoolean, GraphQLObjectType, GraphQLString} from "graphql";

export const TodoGQLType = new GraphQLObjectType({
    name: "TodoList",
    fields: () => ({
        id: { type: GraphQLString },
        text: { type: GraphQLString },
        finished: { type: GraphQLBoolean },
    })
});