"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.createUser = void 0;
const userService = __importStar(require("../services/userService"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Cria um novo User
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.createUser(req.body);
        res.status(201).json({ message: 'user criado com sucesso', resource: user });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: `Não foi possível criar o user: ${error.message}` });
        }
        else {
            res.status(500).json({ message: 'Erro desconhecido ao criar o user' });
        }
    }
});
exports.createUser = createUser;
// Obtém todas os users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.getAllUsers();
        res.status(200).json({ message: 'Lista de users', resource: user });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: `Não foi possível obter os users: ${error.message}` });
        }
        else {
            res.status(500).json({ message: 'Erro desconhecido ao listar as users' });
        }
    }
});
exports.getAllUsers = getAllUsers;
// Atualiza um user existente
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const userData = req.body;
        const user = yield userService.updateUser(id, userData);
        res.status(200).json({ message: 'user atualizado com sucesso', resource: user });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: `Não foi possível atualizar o user: ${error.message}` });
        }
        else {
            res.status(500).json({ message: 'Erro desconhecido ao atualizar o user' });
        }
    }
});
exports.updateUser = updateUser;
// Deleta um user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield userService.deleteUser(id);
        res.status(204).send();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: `Não foi possível deletar o user: ${error.message}` });
        }
        else {
            res.status(500).json({ message: 'Erro desconhecido ao deletar o user' });
        }
    }
});
exports.deleteUser = deleteUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, senha } = req.body;
        const user = yield userService.getUserByEmail(email);
        if (!user || !(yield bcryptjs_1.default.compare(senha, user.senha))) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: `Erro ao autenticar: ${error.message}` });
        }
        else {
            res.status(500).json({ message: 'Erro desconhecido ao autenticar' });
        }
    }
});
exports.loginUser = loginUser;
