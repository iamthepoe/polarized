import {Author} from '@prisma/client'
import { authorsClient } from "../clients/clients.prisma";
import slugify from "slugify";

export class AuthorsService{
    private client: typeof authorsClient;
    constructor(client: typeof authorsClient){
        this.client = client;
    }

    async create(name: string){
        if(!name?.trim()) return {code: 400, data: null, message: `Empty values.`}
        try{
            const slug = slugify(name, {lower: true});
            const response = await this.client.create({
                data:{
                    name,
                    slug
                }
            });
            return {code: 201, data: response, message: 'Created with success.'};
        }catch{
            return {code: 500, data: null, message: 'Server internal error.'};
        }
    }

    async findMany(query: undefined | string){
        try{
            const response = !!query 
                ? await this.client.findMany({where: {name: {contains: query}}}) 
                : await this.client.findMany();

            return {code: 200, data: response, message: 'Finded!'};
        }catch{
            return {code: 500, data: null, message: 'Internal server error.'}
        }
    }
}