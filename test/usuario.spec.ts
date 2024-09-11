import * as userService from '../src/services/userService';
import chai from "chai";



describe("testes usuario", () => {
    it('cria usuario com sucesso', () => {
        
        userService.createUser({nome:"teste", email: "teste.email", senha:"testa", role: "admin"})
        const user = userService.getUserByEmail("teste.email")
        chai.expect(user).to.have.lengthOf(1)
    });
    it('Pega usuario com sucesso', () => {
        const task = userService.getUserByEmail("teste.email") 
        chai.expect(task).to.have.lengthOf(1)
    })

    it('atualiza usario com sucesso', () => {
        const userAntigo = userService.getUserByEmail("teste.email") 
        userService.updateUser(1, {nome: "testado"})
        const userNovo = userService.getUserByEmail("teste.email") 
        chai.expect(userAntigo).to.not.equal(userNovo)
    })

    it('Deleta user com sucesso', () => {
        userService.deleteUser(1)
        const task = userService.getUserByEmail("teste.email") 
        chai.expect(task).to.have.lengthOf(0)
    })
})