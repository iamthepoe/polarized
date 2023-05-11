import { authorsClient } from "../clients/clients.prisma";
import { AuthorsService } from "../services/authors.service";

const authorsServiceFactory = ()=>{
    const authorsService = new AuthorsService(authorsClient);
    return authorsService;
}

export {authorsServiceFactory}