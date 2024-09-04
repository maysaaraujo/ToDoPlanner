"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureRoute = void 0;
const secureRoute = (req, res) => {
    res.status(200).json({ message: 'Você tem acesso a esta rota protegida', user: req.user });
};
exports.secureRoute = secureRoute;
