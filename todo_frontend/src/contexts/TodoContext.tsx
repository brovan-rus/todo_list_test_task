import React, { createContext, useMemo, useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_TODO } from '../api/addTodoMutation';
import { DELETE_TODO } from '../api/deleteTodoMutation';
import { TOGGLE_FINISHED } from '../api/toggleFinishedMutation';

type TodoContextProviderProperties = {
  children: React.ReactNode;
};
type TodoContextType = {
  list: TodoElement[];
  setList?: React.Dispatch<React.SetStateAction<TodoElement[]>>;
  addToList?: (text: string) => void;
  toggleFinished?: (element: TodoElement) => void;
  removeFromList?: (element: TodoElement) => void;
};

export type TodoElement = {
  finished: boolean;
  text: string;
  id: string;
};

const TodoContext = createContext<TodoContextType>({ list: [] });

function TodoContextProvider(properties: TodoContextProviderProperties) {
  const { children } = properties;
  const [list, setList] = useState<TodoElement[]>([]);
  const [addTodo] = useMutation(ADD_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [toggleFinishedMutation] = useMutation(TOGGLE_FINISHED);
  const addToList = async (text: string) => {
    const id = new Date().getUTCMilliseconds().toString();
    const todo = { text, finished: false, id };
    setList((previousState) => [...previousState, todo]);
    await addTodo({ variables: todo });
  };

  const removeFromList = async (element: TodoElement) => {
    setList((previousState) => previousState.filter((element_) => element.id !== element_.id));
    await deleteTodo({ variables: { id: element.id } });
  };

  const toggleFinished = async (element: TodoElement) => {
    setList((previousState) =>
      previousState.map((element_) => {
        if (element_.id === element.id) {
          return { ...element_, finished: !element_.finished };
        }
        return element_;
      }),
    );
    await toggleFinishedMutation({ variables: { id: element.id } });
  };

  const value = useMemo(
    () => ({
      list,
      addToList,
      removeFromList,
      toggleFinished,
      setList,
    }),
    [list, addToList, removeFromList, toggleFinished, setList],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export { TodoContext, TodoContextProvider };
