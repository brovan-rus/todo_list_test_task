import type {Todo} from "../types/Todo";

const graphql = require('graphql')
import {addToStore, deleteFromStore, getTodoList, toggleFinished} from "../stote";

const toDoType = new graphql.GraphQLObjectType({
    name: 'ToDoList',
    fields: () => ({
        id: { type: graphql.GraphQLString },
        text: { type: graphql.GraphQLString },
        finished: { type: graphql.GraphQLBoolean },
    })
});

const mutationType  = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTodo: {
            type: toDoType,
            args: {
                id: { type: graphql.GraphQLString },
                text: { type: graphql.GraphQLString },
                finished: { type: graphql.GraphQLBoolean },
            },
            resolve: function (_source: any, args: Todo) {
                const todo = {
                    id: args.id,
                    text: args.text,
                    finished: args.finished
                }
                addToStore(todo)
                return todo;
            }
        },
        deleteTodo: {
            type: toDoType,
            args: {
                id: { type: graphql.GraphQLString },
            },
            resolve: function (_source: any, args: {id: string}) {
                deleteFromStore(args.id);
                return getTodoList();
            }
        },
        toggleFinished: {
            type: toDoType,
            args: {
                id: { type: graphql.GraphQLString },
            },
            resolve: function (_source: any, args: {id: string}) {
               toggleFinished(args.id)
                return getTodoList();
            }
        },
    }
});

const queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        todo: {
            type: new graphql.GraphQLList(toDoType),
            resolve: function () {
                return getTodoList();
            }
        }
    }
});

export const todoSchema = new graphql.GraphQLSchema(
    {
        query: queryType,
        mutation: mutationType
    }
);