// src/middleware/authMiddleware.ts
import { error } from 'console';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWTService } from '../services/JWTService';




export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;  
  if (authHeader) {
    const auth = JWTService.verify(authHeader)
    if (auth === "INVALID_TOKEN") {
      res.sendStatus(401).json({ message: "Erro ao verificar token" })
    }
    else if (auth === "JWT_SECRET_NOT_FOUND") {
      res.sendStatus(500).json({ message: "token invalido" })
    } else {
      return next()
    }
  } else {
    res.sendStatus(401);
  }
};
