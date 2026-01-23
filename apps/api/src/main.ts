import { app } from './app';

const port = Number(process.env.port) || 3333;
const host = process.env.HOST || '0.0.0.0';
const server = app.listen(port, host, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
