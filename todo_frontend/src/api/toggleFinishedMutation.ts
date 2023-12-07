import { gql } from '@apollo/client';

export const TOGGLE_FINISHED = gql`
  mutation ToggleFinished($id: String) {
    toggleFinished(id: $id) {
      id
      text
      finished
    }
  }
`;
