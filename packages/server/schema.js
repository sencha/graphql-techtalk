import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import { readFileSync } from 'fs';
import { join } from 'path';

const typeDefs = readFileSync(join(__dirname, './schema.gql'), 'utf8');

export default makeExecutableSchema({ typeDefs, resolvers });
