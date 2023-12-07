import React, { createContext, useMemo, useState } from 'react';

type TodoContextProviderProperties = {
  children: React.ReactNode;
};
type TodoContextType = {
  list: TodoElement[];
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
  const addToList = (text: string) => {
    const id = new Date().getUTCMilliseconds().toString();
    setList((previousState) => [...previousState, { text, finished: false, id }]);
  };
  const removeFromList = (element: TodoElement) =>
    setList((previousState) => previousState.filter((element_) => element.id !== element_.id));

  const toggleFinished = (element: TodoElement) =>
    setList((previousState) =>
      previousState.map((element_) => {
        if (element_.id === element.id) {
          return { ...element_, finished: !element_.finished };
        }
        return element_;
      }),
    );

  const value = useMemo(
    () => ({
      list,
      addToList,
      removeFromList,
      toggleFinished,
    }),
    [list, addToList, removeFromList, toggleFinished],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export { TodoContext, TodoContextProvider };
