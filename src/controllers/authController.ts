// src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import * as userService from '../services/userService';
import { JWTService } from '../services/JWTService';



// Endpoint para login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    const user = await userService.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = JWTService.sign({uid:user.id, role:user.role})
    res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Erro ao fazer login: ${error.message}` });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao fazer login' });
    }
  }
};
