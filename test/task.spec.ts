import { Task, User } from "@prisma/client";
import * as taskService from "../src/services/taskService";
import * as userService from '../src/services/userService';



describe("testes task", () => {
    let admin : User
    let taskDefault : Task 
    beforeAll(async () => {
        admin = await userService.createUser({nome:"task", email: "task.email", senha:"task", role: "user"})
        taskDefault = await taskService.createTask({userId:admin.id, titulo: "task padrão", descricao:"uma task padrão", data: new Date(), prioridade:0})
    })
    it('cria task com sucesso', async () => {
        await taskService.createTask({userId:admin.id, titulo: "teste", descricao:"testa aqui", data: new Date(), prioridade:0})
        expect(await taskService.getAllTasks()).not.toEqual([])
    });

    it('atualiza task com sucesso', async() => {
        const taskAntiga = await taskService.getAllTasks() 
        await taskService.updateTask(taskDefault.id, {titulo: "atualizaTask"})
        const taskNova = await taskService.getAllTasks()
        expect(taskNova[0].titulo).not.toEqual(taskAntiga[0].titulo)
    })

    it('Deleta task com sucesso',async() => {
        let tasks = await taskService.getAllTasks()
        const numTaskAntes = tasks.length
        taskService.deleteTask(taskDefault.id)
        tasks = await taskService.getAllTasks()
        const numTaskDepois = tasks.length
        expect(numTaskAntes).not.toEqual(numTaskDepois)
    })
})