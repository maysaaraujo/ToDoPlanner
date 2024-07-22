"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
class Task {
    constructor(id, titulo, descricao, data, prioridade) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.data = new Date(data);
        this.prioridade = prioridade;
    }
}
let tasks = [];
app.post('/createTask', (req, res) => {
    try {
        const task = new Task(req.body.id, req.body.titulo, req.body.descricao, req.body.data, req.body.prioridade);
        tasks.push(task);
        res.status(201).json({ message: 'Task criada com sucesso', resource: task });
    }
    catch (error) {
        res.status(500).json({ message: `Não foi possivel criar a task:${error}` });
    }
});
app.get('/getTasks', (req, res) => {
    try {
        res.status(200).json({ message: 'Lista de Tasks cadastradas', resourcer: tasks });
    }
    catch (error) {
        res.status(500).json({ message: `Não foi possivel retornar as tasks:${error}` });
    }
});
app.put('/editTask/:id', (req, res) => {
    try {
        let find = false;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == parseInt(req.params.id)) {
                tasks[i].titulo = req.body.titulo;
                tasks[i].prioridade = req.body.prioridade;
                tasks[i].descricao = req.body.descricao;
                tasks[i].data = req.body.data;
                find = true;
                res.status(200).json({ message: 'Lista de tasks cadastradas', resourcer: tasks[i] });
            }
        }
        if (!find) {
            res.status(400).send(`Não existe nenhum task com o id: ${req.params.id}`);
        }
    }
    catch (error) {
        res.status(500).json({ message: `não foi possivel retornar a task pois o servidor deu erro:${error}` });
    }
});
app.delete('/deleteTask/:id', (req, res) => {
    try {
        let listTasksAux = [];
        let find = false;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id != parseInt(req.params.id)) {
                listTasksAux.push(tasks[i]);
            }
            else {
                find = true;
            }
        }
        console.log(find);
        tasks = listTasksAux;
        if (!find) {
            res.status(400).send(`Não existe nenhuma task com o id: ${req.params.id}`);
        }
        else {
            res.status(204);
        }
    }
    catch (error) {
        res.status(500).json({ message: `Não foi possivel deletar a task:${error}` });
    }
});
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
