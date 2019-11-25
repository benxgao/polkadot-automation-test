import express from 'express';
import initApiPromise from '../testHelper/initApiPromise';
import { transfer } from './api';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', async (req, res) => {
  res.send('Hello world\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

const main = async () => {
  const api = await initApiPromise();
  const change = await transfer(api);
  console.log('change', change);
};

main();
