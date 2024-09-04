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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getAllTasks = exports.createTask = void 0;
const taskService = __importStar(require("../services/taskService"));
// Cria uma nova tarefa
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { titulo, descricao, data, prioridade, userId } = req.body;
        const task = yield taskService.createTask(req.body);
        res.status(201).json({ message: 'Task criada com sucesso', resource: task });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: `Não foi possível criar a task: ${error.message}` });
        }
        else {
            res.status(500).json({ message: 'Erro desconhecido ao criar a task' });
        }
    }
});
exports.createTask = createTask;
// Obtém todas as tarefas
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield taskService.getAllTasks();
        res.status(200).json({ message: 'Lista de tasks', resource: tasks });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: `Não foi possível obter as tasks: ${error.message}` });
        }
        else {
            res.status(500).json({ message: 'Erro desconhecido ao listar as tasks' });
        }
    }
});
exports.getAllTasks = getAllTasks;
// Atualiza uma tarefa existente
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const task = yield taskService.updateTask(id, req.body);
        res.status(200).json({ message: 'Task atualizada com sucesso', resource: task });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: `Não foi possível atualizar a task: ${error.message}` });
        }
        else {
            res.status(500).json({ message: 'Erro desconhecido ao atualizar a task' });
        }
    }
});
exports.updateTask = updateTask;
// Deleta uma tarefa
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield taskService.deleteTask(id);
        res.status(204).send();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: `Não foi possível deletar a task: ${error.message}` });
        }
        else {
            res.status(500).json({ message: 'Erro desconhecido ao deletar a task' });
        }
    }
});
exports.deleteTask = deleteTask;
