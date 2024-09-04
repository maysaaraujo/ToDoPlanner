// src/controllers/secureController.ts
import { Request, Response } from 'express';

export const secureRoute = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Você tem acesso a esta rota protegida', user: req.user });
};

