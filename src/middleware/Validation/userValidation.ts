import { Request, Response, NextFunction } from 'express';

export const validateCreateUser = (req:Request, res:Response, next: NextFunction) => {
    const {nome, senha,email, role} = req.body
    if(nome){
        if(typeof(nome) != 'string'){
            return res.status(400).json({
                message: "o campo nome deve ser uma string",
                field: "nome",
                code: "Nome invalido"
            })
        }
        
    }else {
        return res.status(400).json({
            message: "o campo nome é obrigatorio",
            field: "nome",
            code: "Campo não preenchido"
        })
    }

    if(senha){
        if(typeof(senha) != 'string'){
            return res.status(400).json({
                message: "o campo senha deve ser uma string",
                field: "senha",
                code: "senha invalido"
            })
        }
        
    }else {
        return res.status(400).json({
            message: "o campo senha é obrigatorio",
            field: "senha",
            code: "Campo não preenchido"
        })
    }

    if(email){
        if(typeof(email) != 'string'){
            return res.status(400).json({
                message: "o campo email deve ser uma string",
                field: "email",
                code: "email invalido"
            })
        }else{
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)){
                return res.status(400).json({
                    message: "o campo email está invalido, insira um email valido",
                    field: "email",
                    code: "email invalido"
                })  
            }
        }
        
    }else {
        return res.status(400).json({
            message: "o campo email é obrigatorio",
            field: "email",
            code: "Campo não preenchido"
        })
    }

    if(role){
        if(typeof(role) != 'string'){
            return res.status(400).json({
                message: "o campo role deve ser uma string",
                field: "role",
                code: "role invalido"
            })
        }else {
            if(role != "user" && role != "admin"){
                return res.status(400).json({
                    message: "Essa role não é permitida",
                    field: "role",
                    code: "role invalido"
                })
            }
        }
    }else {
        return res.status(400).json({
            message: "o campo role é obrigatorio",
            field: "role",
            code: "Campo não preenchido"
        })
    }

    return next()
}

export const validateUpdateUser = (req:Request, res:Response, next: NextFunction) => {
    const {id, nome, email, senha, role} = req.body

    if (id) {
        if(typeof(id) != 'number'){
            return res.status(400).json({
                message: "o campo id deve ser uma number",
                field: "id",
                code: "id invalido"
            })
        }
    } else {
        return res.status(400).json({
            message: "o campo id é obrigatorio",
            field: "id",
            code: "Campo não preenchido"
        })
    }

    if(nome){
        if(typeof(nome) != 'string'){
            return res.status(400).json({
                message: "o campo nome deve ser uma string",
                field: "nome",
                code: "Nome invalido"
            })
        }
        
    }

    if(email){
        if(typeof(email) != 'string'){
            return res.status(400).json({
                message: "o campo email deve ser uma string",
                field: "email",
                code: "email invalido"
            })
        }else{
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)){
                return res.status(400).json({
                    message: "o campo email está invalido, insira um email valido",
                    field: "email",
                    code: "email invalido"
                })  
            }
        }
        
    }

    if(senha){
        if(typeof(senha) != 'string'){
            return res.status(400).json({
                message: "o campo senha deve ser uma string",
                field: "senha",
                code: "senha invalido"
            })
        }
        
    }

    if(role){
        if(typeof(role) != 'string'){
            return res.status(400).json({
                message: "o campo role deve ser uma string",
                field: "role",
                code: "role invalido"
            })
        }else {
            if(role != "user" && role != "admin"){
                return res.status(400).json({
                    message: "Essa role não é permitida",
                    field: "role",
                    code: "role invalido"
                })
            }
        }
    }

    return next()
}

export const validateDeleteUser = (req:Request, res:Response, next: NextFunction) => {
    const id = req.body.id
    if (id) {
        if(typeof(id) != 'number'){
            return res.status(400).json({
                message: "o campo id deve ser uma number",
                field: "id",
                code: "id invalido"
            })
        }
    } else {
        return res.status(400).json({
            message: "o campo id é obrigatorio",
            field: "id",
            code: "Campo não preenchido"
        })
    }
    return next()
}
