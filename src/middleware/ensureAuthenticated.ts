import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string
}

//middle funciona assim: se o meu usuário não estiver autenticado então retornará um erro, senão continuará na aplicação
export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if(!authToken) {
        return response.status(401).json({
            errorCode: 'token.invalid'
        });
    }


    //quando recebe um headers, vem com a seguinte estrutura
    //[0]Bearer
    //[1]token
    const [, token] = authToken.split(" ")

    //verifica se o token é válido
    //retorna no sub o id do usuario
    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

        request.user_id = sub;

        return next();
        
    } catch (err) {
        return response.status(401).json({
            errorCode: 'token.expired'
        });
    }
}