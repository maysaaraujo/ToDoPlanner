// src/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as userService from '../services/userService';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Certifique-se de definir uma chave secreta segura

// Endpoint para login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    const user = await userService.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: `Erro ao fazer login: ${error.message}` });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao fazer login' });
    }
  }
};
