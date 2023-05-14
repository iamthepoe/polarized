import { oppositionsClient } from "../clients/clients.prisma";
import { validateFields } from '../utils/validation.util';
import slugify from "slugify";

export class OppositionsService{
    private client: typeof oppositionsClient;
    constructor(client: typeof oppositionsClient){
        this.client = client;
    }

    async create(data: {firstAuthorId: string, secondAuthorId: string}){
        const {firstAuthorId, secondAuthorId} = data;
        const errorMessage = validateFields(
            { value: firstAuthorId, label: "firstAuthorId" },
            { value: secondAuthorId, label: "secondAuthorId" }
         );

        if (errorMessage) return { code: 400, data: null, message: errorMessage };

        try{
            const authors = await this.client.authors.findMany({
                where: {
                    OR: [
                        {id: firstAuthorId},
                        {id: secondAuthorId}
                    ]
                },
                select: {
                    name: true
                }
            });

            if (authors.length < 2) return {code: 404, data: null, message: 'One or both authors not found.'};
            
            const slug = slugify(`${authors[0].name} ${authors[1].name}`, {lower: true});
            const response = await this.client.opposition.create({
                data: {
                    slug,
                    firstAuthorId,
                    secondAuthorId
                }
            });

            return {code: 201, data: response, message: 'Created with success.'};
        } catch {
            return {code: 500, data: null, message: 'Server internal error.'};
        }
    }
    
    async findMany(query?: string){
        try{
            const response = !!query 
                ? await this.client.opposition.findMany({
                    where: {slug: {contains: query}},
                    select: {
                        id: true,
                        slug: true,
                        firstAuthor: {
                            select:{
                                id: true,
                                name: true,
                                description: true
                            }
                        },
                        secondAuthor: {
                            select:{
                                id: true,
                                name: true,
                                description: true
                            }
                        }
                    }
                })
                : await this.client.opposition.findMany({
                    select: {
                        id: true,
                        slug: true,
                        firstAuthor: {
                            select:{
                                id: true,
                                name: true,
                                description: true
                            }
                        },
                        secondAuthor: {
                            select:{
                                id: true,
                                name: true,
                                description: true
                            }
                        }
                    }
                });
            return {code: 200, data: response, message: 'Finded!'};
        }catch{
            return {code: 500, data: null, message: 'Internal server error.'}
        }
    }
}