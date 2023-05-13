import { oppositionsClient } from "../clients/clients.prisma";
import { OppositionsService } from "../services/oppositions.service";

const oppositionsServiceFactory = ()=>{
    const oppositionService = new OppositionsService(oppositionsClient);
    return oppositionService;
}

export {oppositionsServiceFactory};