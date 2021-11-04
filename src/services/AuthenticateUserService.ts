import axios from 'axios';
import prismaClient from '../prisma';
//para criação do token
import { sign } from 'jsonwebtoken';

//verifica se o usuário existe no DB
//se sim, gera um token
//se não, cria no DB e gera um token
//retorna o token com as informações do usuário logado

//para definir o que quero que retorne
interface IAccessTokenResponse {
    access_token: string
}

//pegar essas informações do git
interface IUserResponse {
    avatar_url: string,
    login: string,
    id: number,
    name: string
}

class AuthenticateUserService {
    
    //receber o code(string)
    async execute(code: string){
        
        //recuperar o access_token no github
        const url = 'https://github.com/login/oauth/access_token';
        
        //await porque é uma função que precisa aguardar o retorno
        //quando data retornar, quero retorne com o nome de accessTo..
        //está recebendo o token e passando para data
        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            //para retornar as informações como json
            headers: {
                'Accept': 'application/json'
            }
        });
        
        //recuperar informação do user do git
        const response = await axios.get<IUserResponse>('https://api.github.com/user', {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        });

        const { login, id, avatar_url, name } = response.data
        
        //conexão com o DB
        //permite acessar o user do model
        let user = await prismaClient.user.findFirst({
            //select
            where: {
                github_id: id
            }
        })

        //se usuário não existe, então crio ele
        if(!user) {
            await prismaClient.user.create({
                data: {
                    github_id: id, 
                    login,
                    avatar_url,
                    name
                }
            })
        }

        const token = sign({
            user: {
                name: user.name,
                avatar_url: user.avatar_url,
                id: user.id
            }
        }, 
        //gerado por md5
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: '1d'
        }
        )
        //retorna o token e as informações da tabela user
        return { token, user }
    }

} export { AuthenticateUserService };