import type {Todo} from "../types/Todo";

import {
    GraphQLList,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLFieldResolver
} from "graphql";
import {addToStore, deleteFromStore, getTodoList, toggleFinished} from "../stote";
import {TodoGQLType} from "./todo";
import {idArg, todoArgs} from "./todoArgs";

const addTodoResolver: GraphQLFieldResolver<any, any, any> = (_source, args) => {
    const todo: Todo = {
        id: args.id,
        text: args.text,
        finished: args.finished,
    };
    addToStore(todo);
    return todo;
};

const deleteTodoResolver: GraphQLFieldResolver<any, any, any> = (_source, args) => {
    deleteFromStore(args.id);
    return {id: args.id};
};

const toggleFinishedResolver: GraphQLFieldResolver<any, any, any> = (_source, args) => {
    toggleFinished(args.id);
    return {id: args.id};
};

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTodo: {
            type: TodoGQLType,
            args: todoArgs,
            resolve: addTodoResolver
        },
        deleteTodo: {
            type: TodoGQLType,
            args: {
                id: idArg,
            },
            resolve: deleteTodoResolver
        },
        toggleFinished: {
            type: TodoGQLType,
            args: {
                id: idArg,
            },
            resolve: toggleFinishedResolver
        }
    }
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        todo: {
            type: new GraphQLList(TodoGQLType),
            resolve: function () {
                return getTodoList();
            }
        }
    }
});

export const todoSchema = new GraphQLSchema(
    {
        query: queryType,
        mutation: mutationType
    }
);