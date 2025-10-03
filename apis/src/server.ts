import app, { initializeServer } from './app';
import { NODE_ENV, PORT } from './config';

const env: string = NODE_ENV || 'development';
const port: number = parseInt(PORT) || 5000;

initializeServer();
export const server = app.listen(port, '0.0.0.0', () => {
  console.log('=================================');
  console.log(`======= ENV: ${env} =======`);
  console.log(`🚀 App listening on the port ${port}`);
  console.log('=================================');
});