import { MotorcycleSchema, 
  Motorcycle } from '../interfaces/MotorcycleInterface';
import Service, { ServiceError } from '.';
import MotorcycleModel from '../models/MotorcycleModel';

class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }

  create = async (obj: Motorcycle): 
  Promise<Motorcycle | ServiceError | null> => {
    const parsed = MotorcycleSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };

  async update(
    id: string,
    obj: Motorcycle,
  ): Promise<Motorcycle | null | ServiceError> {
    const parsed = MotorcycleSchema.safeParse(obj);
    if (!parsed.success) return { error: parsed.error };
    return this.model.update(id, obj);
  }
}

export default MotorcycleService;