import { gql } from '@apollo/client';

export const DELETE_TODO = gql`
  mutation AddTodo($id: String) {
    deleteTodo(id: $id) {
      id
      text
      finished
    }
  }
`;
