import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from './controller';
import MotorcycleService from '../Services/MotorcycleServices';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

class MotorcycleController extends Controller<Motorcycle> {
  private _route: string;

  constructor(
    service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    const motorcycle = await this.service.create(body);
    if (!motorcycle) {
      return res.status(400).json({ error: this.errors.internal });
    }
    if (body.engineCapacity <= 0) {
      return res.status(400).json();
    }
    if ('error' in motorcycle) {
      return res.status(400).json(motorcycle);
    }
    return res.status(201).json(motorcycle);
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: this.errors.requiredId });
    if (id.length < 24) {
      return res.status(400).json({ error: this.errors.idHexadecimal });
    }
    try {
      const motorcycle = await this.service.readOne(id);
      return motorcycle
        ? res.json(motorcycle)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const { body } = req;

    if (Object.keys(body).length === 0) {
      return res.status(400).json();
    }

    if (id.length < 24) {
      return res.status(400).json({ error: this.errors.idHexadecimal });
    }
    const motorcycle = await this.service.update(id, body);
    if (!motorcycle) {
      return res.status(404)
        .json({ error: this.errors.notFound });
    }
    return res.status(200).json(motorcycle);
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: this.errors.requiredId });
    }
    if (id.length < 24) {
      return res.status(400).json({ error: this.errors.idHexadecimal });
    }
    const motorcycle = await this.service.delete(id);
    if (!motorcycle) {
      return res.status(404).json({ error: this.errors.notFound });
    }
    return res.status(204).json(motorcycle);
  };
}

export default MotorcycleController;