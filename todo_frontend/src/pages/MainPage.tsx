import { Container, Divider, Typography } from '@mui/material';
import { useContext } from 'react';
import { useQuery } from '@apollo/client';

import { Form } from '../components/Form';
import { TodoList } from '../components/TodoList';
import { TodoContext } from '../contexts/TodoContext';
import { ActionType } from '../types/ActionType';
import { GET_TODO_LIST } from '../api/getTotoList';

const mainPageText = {
  title: 'To do list',
};

export function MainPage() {
  const { toDoList, dispatch } = useContext(TodoContext);
  useQuery(GET_TODO_LIST, {
    onCompleted: (data) => {
      if (dispatch) {
        dispatch({ type: ActionType.RENEW_TODO_LIST, payload: data.todo });
      }
    },
  });

  return (
    <Container
      sx={{
        p: 10,
        height: '100vh',
      }}
    >
      <Container
        sx={{
          p: 4,
          mx: 'auto',
          width: '50%',
          boxShadow: 4,
          borderRadius: 1,
        }}
      >
        <Typography sx={{ textAlign: 'center', pb: 1 }} variant="h4" component="h1">
          {mainPageText.title}
        </Typography>
        {toDoList.length > 0 ? <TodoList /> : ''}
        <Divider variant="middle" sx={{ p: 1 }} />
        <Form />
      </Container>
    </Container>
  );
}
