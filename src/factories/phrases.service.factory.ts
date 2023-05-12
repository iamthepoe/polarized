import { phrasesClient } from "../clients/clients.prisma";
import { PhrasesService } from "../services/phrases.service";

const phrasesServiceFactory = ()=>{
    const phrasesService = new PhrasesService(phrasesClient);
    return phrasesService;
}

export {phrasesServiceFactory}