import { Container, Divider, Typography } from '@mui/material';
import { useContext } from 'react';

import { Form } from '../components/Form';
import { TodoList } from '../components/TodoList';
import { TodoContext } from '../contexts/TodoContext';

const mainPageText = {
  title: 'To do list',
};

export function MainPage() {
  const { list } = useContext(TodoContext);
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
