import { useContext } from 'react';
import { Container, List } from '@mui/material';

import { TodoContext } from '../contexts/TodoContext';

import { TodoListElement } from './TodoListElement';

export function TodoList() {
  const { toDoList } = useContext(TodoContext);
  return (
    <Container>
      <List sx={{ display: 'flex', gap: 2, flexDirection: 'column' }} component="ul">
        {toDoList.map((element) => (
          <TodoListElement key={element.id} element={element} />
        ))}
      </List>
    </Container>
  );
}
