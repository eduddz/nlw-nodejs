import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io'
import { router } from './routes';

//chamando a função express e passando na variável app
const app = express();
app.use(cors());

//ahora o http sobe para o servidor, não mais o express
const serverHttp = http.createServer(app);

//http se conectando tanto com o http como o websocket
const io = new Server(serverHttp, {
    cors: {
        origin: '*'
    }
});

io.on('connection', socket => {
    console.log(`Usuário conectado no socket ${socket.id}`)
})

app.use(express.json());

//passa as rotas do router
app.use(router);

//rota de login
//no momento que acessar /github, será redirecionada para a tela de autenticação
app.get('/github', (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
})

//rota de callback
//url de callback
app.get('/signin/callback', (request, response) => {

    //fazendo desestruturação do code que aparece na url através do request.query
    const { code } = request.query;

    //chamando esse code na tela
    return response.json(code);
})

//essa é uma rota teste, apenas para fins de entendimento
app.get('/meuperfil', (request, response) => {
    console.log('redirecionando2')
})

export { serverHttp, io };