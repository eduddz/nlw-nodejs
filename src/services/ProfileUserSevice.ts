import prismaClient from "../prisma";

class ProfileUserService {
    //vai pegar as 3 ultimas mensagens
    async execute(user_id) {
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        })

        return user;

    }
} export { ProfileUserService }