import { gql } from '@apollo/client';

export const TOGGLE_DONE_MUTATION = gql`
  mutation ToggleFinished($id: String) {
    toggleFinished(id: $id) {
      id
      text
      finished
    }
  }
`;
