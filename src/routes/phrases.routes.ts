import express from 'express';
import { phrasesServiceFactory } from '../factories/phrases.service.factory';

const router = express.Router();
const phrasesService = phrasesServiceFactory();

router.get('/phrases', async(req,res)=>{
    const content = req.query.content as string | undefined;
    const response = await phrasesService.findMany(content);
    const {data, code, message} = response;
    return res.status(code).json({data, message});
});

router.get('/phrase/:id', async(req,res)=>{
    const {id} = req.params;
    const response = await phrasesService.findById(id);
    const {data, code, message} = response;
    return res.status(code).json({data, message});
});

router.post('/phrase', async (req,res)=>{
    const {content, authorId, source} = req.body;
    const response = await phrasesService.create({content, authorId, source});
    const {data, code, message} = response;
    return res.status(code).json({data, message});
});

router.patch('/author/:id', async (req,res)=>{
    const {content, authorId, source} = req.body;
    const {id} = req.params;
    const response = await phrasesService.updateOne(id, {content, authorId, source});
    const {data, code, message} = response;
    return res.status(code).json({data, message});
});

router.delete('/author/:id', async (req,res)=>{
    const {id} = req.params;
    const response = await phrasesService.deleteOne(id);
    const {data, code, message} = response;
    return res.status(code).json({data, message});
});

export {router as PhrasesRoutes};