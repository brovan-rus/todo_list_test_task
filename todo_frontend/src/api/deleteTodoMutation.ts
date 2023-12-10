import { gql } from '@apollo/client';

export const DELETE_TODO_MUTATION = gql`
  mutation AddTodo($id: String) {
    deleteTodo(id: $id) {
      id
      text
      finished
    }
  }
`;
