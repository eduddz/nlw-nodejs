Para iniciar o package.json

    yarn init -y

Para o servidor

    yarn add express

@types para tipagem de dependencia de desenvolvimento 
-ts-node-dev faz auto reload da aplicação

    yarn add -D @types/express typescript ts-node-dev

Cria tsconfig.json

    yarn tsc --init

Agora dentro do tsconfig.json vamos mudar 'scrict': 'false', pois typescript já identifica por padrão problemas de lógica


Instalar o prisma em um projeto já existente
Prima? Ajudar conectar o banco de dados a aplicação. Trabalha com banco de dados relacionais. Ex: SQLite, Postgrees

    yarn add prisma -D

Para iniciar

    yarn prisma init

O prisma cria por padrão o arquivo .env e passa uma variável de ambiente DATABASE_URL para conectar ao banco, também cria o arquivo schema.prisma onde fica declarado as tabelas, ...


Agora vamos criar OAuth Application do github, ou seja, vamos criar uma autenticação entre o github do cliente e o projeto em si.

    Site: github.com/settings/developers

    Homepage URL: http://localhost:4000
    Authorization callback URL: http://localhost:4000/signin/callback

Vamos gerar código 'client secrets' e já copiar passando no .env, pois depois do reload esse código some

Agora vamos simular a rota de login do github no app.ts

Para ter acesso ao .env

    yarn add dotenv

Na autenticação com o github, após feita. O git passa um código, com esse código consegue recuperar o token e com o token é possível ter acesso as informações do user


Para fazer chamada externa, ex: api do github

    yarn add axios
    yarn add @types/axios -D

Como é um método via post e o browser só entende requisições do tipo get. Para isso, vamos usar Insominia


Para pegar o token do git e gerar o nosso token. Ajuda a gerar um token

    yarn add jsonwebtoken
    yarn add @types/jsonwebtoken -D


Para o prisma criar a tabela através do 'model user'
Migration é o histórico de tudo que está sendo adicionado no DB

    yarn prisma migrate dev
    Name da migrate: create-users

Para acessar os dados do DB

    yarn prisma stdio


Websocket
Realtime

    yarn add socket.io
    yarn add @types/socket.io -D


Responsável por permitir ou barrar requisições na aplicação

    yarn add cors
    yarn add @types/cors -D
