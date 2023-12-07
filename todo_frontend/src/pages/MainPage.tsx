import { Container, Divider, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

import { Form } from '../components/Form';
import { TodoList } from '../components/TodoList';
import { TodoContext } from '../contexts/TodoContext';

const mainPageText = {
  title: 'To do list',
};

const GET_TODO = gql`
  query Todo {
    todo {
      id
      text
      finished
    }
  }
`;

export function MainPage() {
  const { list, setList } = useContext(TodoContext);
  const { data } = useQuery(GET_TODO);
  useEffect(() => {
    if (setList && data) {
      setList(data.todo);
    }
  }, [data]);

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
        {list.length > 0 ? <TodoList /> : ''}
        <Divider variant="middle" sx={{ p: 1 }} />
        <Form />
      </Container>
    </Container>
  );
}
