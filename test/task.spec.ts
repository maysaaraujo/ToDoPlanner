import { Task } from "@prisma/client";
import * as taskService from "../src/services/taskService";
import chai from "chai";



describe("testes task", () => {
    it('cria task com sucesso', () => {
        taskService.createTask({id:1, titulo: "teste", descricao:"testa aqui", data: new Date().getDate, prioridade:0})
        const task = taskService.getAllTasks() 
        chai.expect(task).to.have.lengthOf(1)
    });

    it('Pega task com sucesso', () => {
        const task = taskService.getAllTasks() 
        chai.expect(task).to.have.lengthOf(1)
    })

    it('atualiza task com sucesso', () => {
        const taskAntiga = taskService.getAllTasks() 
        taskService.updateTask(1, {titulo: "atualizaTask"})
        const taskNova = taskService.getAllTasks()
        chai.expect(taskNova).to.not.equal(taskAntiga)
    })

    it('Deleta task com sucesso', () => {
        taskService.deleteTask(1)
        const task = taskService.getAllTasks() 
        chai.expect(task).to.have.lengthOf(0)
    })
})