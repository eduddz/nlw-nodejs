import { serverHttp } from "./app"

//abrindo a porta 4000 para acessar minha aplicação
serverHttp.listen(4000, () => {
    console.log('deu certo')
})