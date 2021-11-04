import prismaClient from "../prisma";
import { io } from '../app';

class CreateMessageService {
    //vai conter o texto que quero salvar no banco e qual o usuário está mandando mensagem
    async execute(text: string, user_id: string) {
        const message = await prismaClient.message.create({
            data: {
                text,
                user_id
            },
            //para retornar todas as informações da tabela user
            include: {
                user: true
            }
        });

        const infoWS = {
            text: message.text,
            user_id: message.user_id,
            created_id: message.created_at,
            user: {
                name: message.user.name,
                avatar_url: message.user.avatar_url
            }
        }
        //para emitir a mensagem
        io.emit('new_message', infoWS);

        return message;
    }
    
} export { CreateMessageService }