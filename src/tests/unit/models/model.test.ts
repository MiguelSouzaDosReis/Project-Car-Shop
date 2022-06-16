import { expect } from 'chai';
import Sinon from 'sinon';
import CarModel from '../../../models/CarModel';

describe("CarModel", () => {
  let carModel =  new CarModel();
  const carExemple = {
    model: 'a',
    year: 1902,
    color: 'a',
    status: true,
    buyValue: 1,
    doorsQty: 1,
    seatsQty: 1,
  }
  describe(('create'), () => {
    before(() => {
      Sinon.stub(carModel, 'create').resolves(carExemple)
    })
    after(() => {
      (carModel.create as Sinon.SinonStub).restore()
    })
    it(('retorna um objeto'), async() => {
      const carCreate = await carModel.create(carExemple);

      expect(carCreate).to.be.an('object')
    })
  })

})