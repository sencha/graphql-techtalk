import server from 'server';
import path from 'path';

const config = require('../webpack.config')();
const contentBase = path.join(__dirname, '..', 'build');

server(config, contentBase);
