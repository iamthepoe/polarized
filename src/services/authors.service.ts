import {Author} from '@prisma/client'
import { authorsClient } from "../clients/clients.prisma";
import slugify from "slugify";

export class authorsService{
    private client: typeof authorsClient;
    constructor(client: typeof authorsClient){
        this.client = client;
    }

    async create(data: Author){
        const {name} = data;
        const slug = slugify(name);

        const response = await this.client.create({
            data:{
                name,
                slug
            }
        });

        return {status: 201, data: response, message: 'Created with success.'};
    }
}