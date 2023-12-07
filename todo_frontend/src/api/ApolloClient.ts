import { ApolloClient, InMemoryCache } from '@apollo/client';

import { apiUri } from '../const/api';

export const client = new ApolloClient({
  uri: apiUri,
  cache: new InMemoryCache(),
});
