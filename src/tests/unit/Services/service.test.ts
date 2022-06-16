import { expect } from 'chai';
import { describe } from 'mocha';
import Sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarServices';

describe('Service', () => {
  let carModel = new CarModel();
  let carService = new CarService();
    describe('CRUD functions working', () => {
      const carExemple = {  
        model: 'a',
        year: 1902,
        color: 'b',
        status: true,
        buyValue: 2,
        doorsQty: 2,
        seatsQty: 2
      };
      before(() => {
        Sinon.stub(carModel, 'create').resolves(carExemple)
      })
      after(() => {
        (carModel.create as Sinon.SinonStub).restore()
      })
      it(('retorna um objeto'), async() => {
        const carCreate = await carService.create(carExemple);

        expect(carCreate).to.be.an('object')
      })
    });
  });