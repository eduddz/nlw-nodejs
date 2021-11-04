import prismaClient from "../prisma";

class GetLast3MessagesService {
    //vai pegar as 3 ultimas mensagens
    async execute() {
        const messages = await prismaClient.message.findMany({
            //limite de 3 messagens que quero retornar
            take: 3,
            orderBy: {
                //ordem decrescente
                created_at: "desc"
            },
            include: {
                //incluir as informações do usuario
                user: true
            }
        })

        return messages;

    }
} export { GetLast3MessagesService }