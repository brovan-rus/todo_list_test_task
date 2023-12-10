import React, { createContext, useEffect, useMemo, useReducer, useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_TODO_MUTATION } from '../api/addTodoMutation';
import { DELETE_TODO_MUTATION } from '../api/deleteTodoMutation';
import { TOGGLE_DONE_MUTATION } from '../api/toggleFinishedMutation';
import { TodoElement } from '../types/ToDo';
import { ActionType } from '../types/ActionType';

type TodoContextProviderProperties = {
  children: React.ReactNode;
};
type TodoContextType = {
  toDoList: TodoElement[];
  asyncDispatch?: AsyncDispatch;
  dispatch?: React.Dispatch<Action>;
};

type TodoReducer = (state: TodoElement[], action: Action) => TodoElement[];
type AsyncDispatch = (action: Action) => void;

interface SetAsyncAction {
  type: ActionType;
  payload: Partial<TodoElement>;
}

type Action =
  | { type: ActionType.ADD_TODO; payload: { text: string } }
  | { type: ActionType.ADD_TODO_REQUEST; payload: TodoElement }
  | { type: ActionType.ADD_TODO_SUCCESS; payload: TodoElement }
  | { type: ActionType.DELETE_TODO; payload: { id: string } }
  | { type: ActionType.DELETE_TODO_REQUEST; payload: { id: string } }
  | { type: ActionType.DELETE_TODO_SUCCESS; payload: { id: string } }
  | { type: ActionType.TOGGLE_FINISHED; payload: { id: string } }
  | { type: ActionType.TOGGLE_FINISHED_REQUEST; payload: { id: string } }
  | { type: ActionType.TOGGLE_FINISHED_SUCCESS; payload: { id: string } }
  | { type: ActionType.RENEW_TODO_LIST; payload: TodoElement[] }
  | SetAsyncAction;

const TodoContext = createContext<TodoContextType>({ toDoList: [] });

function TodoContextProvider(properties: TodoContextProviderProperties) {
  const { children } = properties;

  const [addTodoMutation] = useMutation(ADD_TODO_MUTATION);
  const [deleteTodoMutation] = useMutation(DELETE_TODO_MUTATION);
  const [toggleDoneMutation] = useMutation(TOGGLE_DONE_MUTATION);
  const [asyncAction, setAsyncAction] = useState<Action | null>(null);

  const todoReducer: TodoReducer = (state, action) => {
    switch (action.type) {
      case ActionType.RENEW_TODO_LIST: {
        return [...(action.payload as TodoElement[])];
      }
      case ActionType.ADD_TODO_SUCCESS: {
        return [...state, action.payload as TodoElement];
      }
      case ActionType.DELETE_TODO_SUCCESS: {
        return state.filter((element) => element.id !== action.payload.id);
      }
      case ActionType.TOGGLE_FINISHED_SUCCESS: {
        return state.map((element) =>
          element.id === action.payload.id ? { ...element, finished: !element.finished } : element,
        );
      }
      default: {
        return state;
      }
    }
  };

  const [toDoList, dispatch] = useReducer<React.Reducer<TodoElement[], Action>>(todoReducer, []);

  useEffect(() => {
    const performMutation = async () => {
      if (!asyncAction) return;
      try {
        switch (asyncAction.type) {
          case ActionType.ADD_TODO_REQUEST: {
            const id = new Date().getUTCMilliseconds().toString();
            const todo = { text: asyncAction.payload.text, finished: false, id };
            await addTodoMutation({ variables: todo });
            dispatch({ type: ActionType.ADD_TODO_SUCCESS, payload: todo });
            break;
          }
          case ActionType.DELETE_TODO_REQUEST: {
            await deleteTodoMutation({ variables: { id: asyncAction.payload.id } });
            dispatch({ type: ActionType.DELETE_TODO_SUCCESS, payload: asyncAction.payload });
            break;
          }
          case ActionType.TOGGLE_FINISHED_REQUEST: {
            await toggleDoneMutation({ variables: { id: asyncAction.payload.id } });
            dispatch({ type: ActionType.TOGGLE_FINISHED_SUCCESS, payload: asyncAction.payload });
            break;
          }
          default: {
            throw new Error(`Unhandled action type: ${asyncAction.type}`);
          }
        }
      } catch (error) {
        console.error(`Error occurred during ${asyncAction.type}:`, error);
      }
    };

    performMutation();
  }, [asyncAction]);

  const asyncDispatch: AsyncDispatch = (action) => {
    switch (action.type) {
      case ActionType.ADD_TODO:
      case ActionType.DELETE_TODO:
      case ActionType.TOGGLE_FINISHED: {
        const currentAsyncAction: SetAsyncAction = {
          type: `${action.type}_REQUEST` as ActionType, // Cast to ActionTypes
          payload: action.payload,
        };
        setAsyncAction(currentAsyncAction);
        break;
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  };

  const value = useMemo(
    () => ({
      toDoList,
      asyncDispatch,
      dispatch,
    }),
    [toDoList, asyncDispatch, dispatch],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export { TodoContext, TodoContextProvider };
