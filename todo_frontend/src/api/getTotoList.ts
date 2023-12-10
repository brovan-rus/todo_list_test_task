import { gql } from '@apollo/client';

export const GET_TODO_LIST = gql`
  query Todo {
    todo {
      id
      text
      finished
    }
  }
`;
