import { phrasesClient } from "../clients/clients.prisma";
import { validateFields } from "../utils/validation.util";

export class PhrasesService{
    private client: typeof phrasesClient;
    constructor(client: typeof phrasesClient){
        this.client = client;
    }

    async create(data: {authorId: string, content: string, source: string}){
        const {authorId, content, source} = data;

        const errorMessage = validateFields(
            { value: content, label: "content" },
            { value: authorId, label: "authorId" },
            { value: source, label: "source" }
         );

        if (errorMessage) return { code: 400, data: null, message: errorMessage };

        try{
            const response = await this.client.create({
                data:{
                    content,
                    source,
                    authorId
                }
            });
            return {code: 201, data: response, message: 'Created with success.'};
        }catch{
            return {code: 500, data: null, message: 'Server internal error.'};
        }
    }

    async findById(id: string){
        try{
            const response = await this.client.findUnique({
                where: {id},
                select: {
                    id: true,
                    content: true,
                    source: true,
                    author:{
                        select:{
                            id: true,
                            name: true
                        }
                    }
                }
            });

            if(!response) return {code: 404, data: null, message: 'Not found.'};

            return {code: 200, data: response, message: 'Finded.'};
        }catch{
            return {code: 500, data: null, message: 'Internal server error.'}
        }
    }

    async findMany(query?: string){
        try{
            const response = !!query 
                ? await this.client.findMany({
                    where: {
                        content: {contains: query}
                    },
                    select:{
                        id: true,
                        content: true,
                        source: true,
                        author: {
                            select:{
                                id: true,
                                name: true
                            }
                        }
                    }
                })
                : await this.client.findMany({
                    select:{
                        id: true,
                        content: true,
                        source: true,
                        author: {
                            select:{
                                id: true,
                                name: true
                            }
                        }
                    }
                });
            return {code: 200, data: response, message: 'Finded!'};
        }catch{
            return {code: 500, data: null, message: 'Internal server error.'}
        }
    }

    async findPhrasesByAuthor(authorId: string){
        try{
            const response = await this.client.findMany({
                where: {authorId},
                select: {
                    id: true,
                    content: true,
                    source: true,
                }
            });
            
            if(!response) return {code: 404, data: null, message: 'Not found.'};

            return {code: 200, data: response, message: 'Finded!'};
        }catch{
            return {code: 500, data: null, message: 'Internal server error.'}
        }
    }

    async updateOne(id: string, data: {content?: string, authorId?: string, source?: string}){
        const {content, authorId, source} = data;

        if(!content) delete data['name'];

        if(!authorId) delete data['authorId'];

        if(!source) delete data['source'];
        
        try{
            let response = await this.client.findUnique({where: {id}});
            if(!response) return {code: 404, data: null, message: 'Not found.'};
            response = await this.client.update({
                where: {id},
                data
            });
            return {code: 200, data: response, message: 'Updated.'};
        }catch{
            return {code: 500, data: null, message: 'Internal server error.'}
        }
    }
    
    async deleteOne(id: string){
        try{
            let response = await this.client.findUnique({where:{id}});
            if(!response) return {code: 404, data: null, message: 'Not found.'};
            response = await this.client.delete({where:{id}});
            return {code: 204, data: response, message: 'Deleted.'};
        }catch{
            return {code: 500, data: null, message: 'Internal server error.'}
        }
    }
}