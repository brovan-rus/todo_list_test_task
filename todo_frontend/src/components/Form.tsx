import { Button, Container, InputLabel, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';

import { TodoContext } from '../contexts/TodoContext';
import { ActionType } from '../types/ActionType';

const formTexts = {
  button: 'Add to the list',
  label: 'Add your plans to the list:',
  placeholder: 'My new plan',
};

export function Form() {
  const [todoText, setTodoText] = useState('');
  const { asyncDispatch } = useContext(TodoContext);

  const handleTodoText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (asyncDispatch) {
      asyncDispatch({ type: ActionType.ADD_TODO, payload: { text: todoText } });
    }
    setTodoText('');
  };

  return (
    <Container sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <form onSubmit={handleSubmit}>
        <InputLabel htmlFor="my-input">{formTexts.label}</InputLabel>
        <Container
          disableGutters
          maxWidth="sm"
          sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
        >
          <TextField
            onChange={handleTodoText}
            value={todoText}
            id="my-input"
            label={formTexts.placeholder}
            variant="standard"
          />
          <Button type="submit" size="small" variant="contained">
            {formTexts.button}
          </Button>
        </Container>
      </form>
    </Container>
  );
}
