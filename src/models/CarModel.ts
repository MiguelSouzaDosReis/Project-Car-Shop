import { Schema, model as createModel, Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

export interface CarDocument extends Car, Document { }
const carSchema = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, {
  versionKey: false,
});

class CarModel extends MongoModel<Car> {
  constructor(model = createModel('carro', carSchema)) {
    super(model);
  }
}

export default CarModel;