import CustomRouter from './routes/Router';
import App from './app';

import Controller from './controllers/CarController';

import { Car } from './interfaces/CarInterface';

const server = new App();

const carController = new Controller();

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

server.addRouter(carRouter.router);

export default server;