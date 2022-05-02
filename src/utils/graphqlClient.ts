import { GraphQLClient } from 'graphql-request';
import 'dotenv/config';
const clientGraphql = new GraphQLClient(process.env.HASURA_URL, {
  headers: { 'x-hasura-admin-secret': process.env.HASURA_SECRET },
});

export default clientGraphql;
