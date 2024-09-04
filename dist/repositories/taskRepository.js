"use strict";
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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTask = (titulo, descricao, data, prioridade, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.task.create({
        data: { titulo, descricao, data, prioridade, userId }
    });
});
exports.createTask = createTask;
const getAllTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.task.findMany();
});
exports.getAllTasks = getAllTasks;
const updateTask = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.task.update({
        where: { id },
        data
    });
});
exports.updateTask = updateTask;
const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.task.delete({
        where: { id }
    });
});
exports.deleteTask = deleteTask;
