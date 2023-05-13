import { oppositionsClient } from "../clients/clients.prisma";
import { validateFields } from '../utils/validation.util';
import slugify from "slugify";

export class OppositionsService{
    private client: typeof oppositionsClient;
    constructor(client: typeof oppositionsClient){
        this.client = client;
    }
}