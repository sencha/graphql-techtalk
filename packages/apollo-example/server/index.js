import webpack from 'webpack';
import path from 'path';
import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import schema from './schema';
import data from './data';

const port = 8080;
const app = express();
const config = require('../webpack.config')();

app.use('/graphql', bodyParser.json(), graphqlExpress({ 
  schema,
  printErrors: true
}));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.use(express.static(path.join(__dirname, '..', 'build')));

if (process.env.NODE_ENV !== 'production') {
    const webpackMiddleware = require("webpack-dev-middleware");
    app.use(webpackMiddleware(webpack(config)));
}

app.listen(port, () => console.log(
  `GraphiQL is now running on http://localhost:${port}/graphiql`
));

app.get('/employees', (req, res) => {
  res.json(data)
})