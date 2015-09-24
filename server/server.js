
import express from 'express';
const app = express();

import http from 'http';
const server = http.createServer(app);

import expressConfig from './config/express';
expressConfig(app);

export default server;
