import { useContext } from 'react';
import { Box, Checkbox, IconButton, ListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { TodoContext } from '../contexts/TodoContext';
import { ActionType } from '../types/ActionType';
import { TodoElement } from '../types/ToDo';

type TodoListElementProperties = {
  element: TodoElement;
};
export function TodoListElement({ element }: TodoListElementProperties) {
  const { asyncDispatch } = useContext(TodoContext);
  const handleFinish = () => {
    if (asyncDispatch) {
      asyncDispatch({ type: ActionType.TOGGLE_FINISHED, payload: element });
    }
  };
  const handleDelete = () => {
    if (asyncDispatch) {
      asyncDispatch({ type: ActionType.DELETE_TODO, payload: element });
    }
  };
  return (
    <ListItem
      component="li"
      key={element.id}
      sx={{ boxShadow: 5, borderRadius: 1, display: 'grid', gridTemplateColumns: '1fr 20%' }}
    >
      <Typography sx={{ width: '80%', textDecoration: element.finished ? 'line-through' : 'none' }}>
        {element.text}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Checkbox checked={element.finished} onChange={handleFinish} />
        <IconButton
          size="small"
          sx={{ boxShadow: 1, border: 1 }}
          aria-label="delete"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
}
