import { User } from '@prisma/client';
import * as userService from '../src/services/userService';




describe("testes usuario", () => {
    let admin : User
    beforeAll(async () => {
        admin = await userService.createUser({nome:"admin", email: "admin.email", senha:"admin", role: "admin"})
    })
    it('cria usuario com sucesso', async () => {
        const usuario = await userService.createUser({nome:"teste", email: "teste.email", senha:"testa", role: "user"})
        expect(userService.getUserByEmail(usuario.email)).not.toBeNull()
    });
    it('Pega usuario com sucesso', async() => {
        const task = await userService.getUserByEmail(admin.email) 
        expect(task).not.toBeNull()
    })

    it('atualiza usario com sucesso', async () => {
        const userAntigo = await userService.getUserByEmail(admin.email) 
        await userService.updateUser(1, {nome: "testado"}) 
        const userNovo = await userService.getUserByEmail(admin.email)
        expect(userAntigo).not.toEqual(userNovo)
    })

    it('Deleta user com sucesso', async() => {
        await userService.deleteUser(admin.id)
        expect(await userService.getUserByEmail(admin.email) ).toBeNull()
    })
})