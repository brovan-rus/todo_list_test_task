import { gql } from '@apollo/client';

export const ADD_TODO = gql`
  mutation AddTodo($text: String, $id: String, $finished: Boolean) {
    addTodo(text: $text, id: $id, finished: $finished) {
      id
      text
      finished
    }
  }
`;
