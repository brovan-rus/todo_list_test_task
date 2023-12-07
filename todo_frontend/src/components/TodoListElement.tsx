import { useContext } from 'react';
import { Checkbox, Container, IconButton, ListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { TodoContext, TodoElement } from '../contexts/TodoContext';

type TodoListElementProperties = {
  element: TodoElement;
};
export function TodoListElement({ element }: TodoListElementProperties) {
  const { toggleFinished, removeFromList } = useContext(TodoContext);
  const handleFinish = () => {
    if (toggleFinished) {
      toggleFinished(element);
    }
  };
  const handleDelete = () => {
    if (removeFromList) {
      removeFromList(element);
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
      <Container sx={{ display: 'flex' }}>
        <Checkbox checked={element.finished} onChange={handleFinish} />
        <IconButton
          size="small"
          sx={{ boxShadow: 1, border: 1, borderRadius: 4 }}
          aria-label="delete"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </Container>
    </ListItem>
  );
}
