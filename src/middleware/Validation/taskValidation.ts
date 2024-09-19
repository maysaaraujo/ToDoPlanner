import { Request, Response, NextFunction } from 'express';

export const validateCreateTask = (req: Request, res: Response, next: NextFunction) => {
    const { titulo, descricao, data, prioridade, userId } = req.body;

    if (titulo) {
        if (typeof(titulo) !== 'string') {
            return res.status(400).json({
                message: "O campo titulo deve ser uma string",
                field: "titulo",
                code: "Titulo invalido"
            });
        }
    } else {
        return res.status(400).json({
            message: "O campo titulo é obrigatório",
            field: "titulo",
            code: "Campo não preenchido"
        });
    }

    if (descricao) {
        if (typeof(descricao) !== 'string') {
            return res.status(400).json({
                message: "O campo descricao deve ser uma string",
                field: "descricao",
                code: "Descricao invalida"
            });
        }
    } else {
        return res.status(400).json({
            message: "O campo descricao é obrigatório",
            field: "descricao",
            code: "Campo não preenchido"
        });
    }

    if (data) {
        const dataValue = new Date(data);
        if (isNaN(dataValue.getTime())) {
            return res.status(400).json({
                message: "O campo data deve ser uma data válida",
                field: "data",
                code: "Data invalida"
            });
        }
    } else {
        return res.status(400).json({
            message: "O campo data é obrigatório",
            field: "data",
            code: "Campo não preenchido"
        });
    }

    if (prioridade !== undefined) {
        if (typeof(prioridade) !== 'number') {
            return res.status(400).json({
                message: "O campo prioridade deve ser um número",
                field: "prioridade",
                code: "Prioridade invalida"
            });
        }
    } else {
        return res.status(400).json({
            message: "O campo prioridade é obrigatório",
            field: "prioridade",
            code: "Campo não preenchido"
        });
    }

    if (userId) {
        if (typeof(userId) !== 'number') {
            return res.status(400).json({
                message: "O campo userId deve ser um número",
                field: "userId",
                code: "UserId invalido"
            });
        }
    } else {
        return res.status(400).json({
            message: "O campo userId é obrigatório",
            field: "userId",
            code: "Campo não preenchido"
        });
    }

    return next();
};

export const validateUpdateTask = (req: Request, res: Response, next: NextFunction) => {
    const { id, titulo, descricao, data, prioridade, userId } = req.body;

    if (id) {
        if (typeof(id) !== 'number') {
            return res.status(400).json({
                message: "O campo id deve ser um número",
                field: "id",
                code: "Id invalido"
            });
        }
    } else {
        return res.status(400).json({
            message: "O campo id é obrigatório",
            field: "id",
            code: "Campo não preenchido"
        });
    }

    if (titulo && typeof(titulo) !== 'string') {
        return res.status(400).json({
            message: "O campo titulo deve ser uma string",
            field: "titulo",
            code: "Titulo invalido"
        });
    }

    if (descricao && typeof(descricao) !== 'string') {
        return res.status(400).json({
            message: "O campo descricao deve ser uma string",
            field: "descricao",
            code: "Descricao invalida"
        });
    }

    if (data) {
        const dataValue = new Date(data);
        if (isNaN(dataValue.getTime())) {
            return res.status(400).json({
                message: "O campo data deve ser uma data válida",
                field: "data",
                code: "Data invalida"
            });
        }
    }

    if (prioridade !== undefined && typeof(prioridade) !== 'number') {
        return res.status(400).json({
            message: "O campo prioridade deve ser um número",
            field: "prioridade",
            code: "Prioridade invalida"
        });
    }

    if (userId && typeof(userId) !== 'number') {
        return res.status(400).json({
            message: "O campo userId deve ser um número",
            field: "userId",
            code: "UserId invalido"
        });
    }

    return next();
};

export const validateDeleteTask = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    if (id) {
        if (typeof(id) !== 'number') {
            return res.status(400).json({
                message: "O campo id deve ser um número",
                field: "id",
                code: "Id invalido"
            });
        }
    } else {
        return res.status(400).json({
            message: "O campo id é obrigatório",
            field: "id",
            code: "Campo não preenchido"
        });
    }

    return next();
};
