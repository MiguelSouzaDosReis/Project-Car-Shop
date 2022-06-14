import CustomRouter from './routes/Router';
import App from './app';

import ControllerCar from './controllers/CarController';
import ControllerMotor from './controllers/MotorcycleControllers';

import { Car } from './interfaces/CarInterface';
import { Motorcycle } from './interfaces/MotorcycleInterface';

const server = new App();

const carController = new ControllerCar();
const motoController = new ControllerMotor();

const carRouter = new CustomRouter<Car>();
const motoRouter = new CustomRouter<Motorcycle>();

carRouter.addRoute(carController);
motoRouter.addRoute(motoController);

server.addRouter(carRouter.router);
server.addRouter(motoRouter.router);

export default server;