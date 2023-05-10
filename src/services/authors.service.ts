import { authorsClient } from "../clients/clients.prisma";

export class authorsService{
    private client: typeof authorsClient;
    constructor(client: typeof authorsClient){
        this.client = client;
    }
}