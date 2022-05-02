import { GraphQLClient } from 'graphql-request';
const clientGraphql = new GraphQLClient(
  'https://hasura-production-82f8.up.railway.app/v1/graphql',
  { headers: { 'x-hasura-admin-secret': 'b42DA30e' } },
);

export default clientGraphql;
