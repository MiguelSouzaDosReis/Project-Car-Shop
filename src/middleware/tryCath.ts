import { Request, Response } from 'express';

const tryCatchError = (err: unknown, _req: Request, res: Response) => {
  console.log(err);
  return res.status(500).json({ err, error: 'Internal Server Error' });
};
export default tryCatchError;