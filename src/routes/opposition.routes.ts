import express from 'express';
import {oppositionsServiceFactory} from '../factories/oppositions.service.factory';

const router = express.Router();
const oppositionsService = oppositionsServiceFactory();

router.get('/oppositions', async (req,res)=>{
    const slug = req.query.slug as string | undefined;
    const response = await oppositionsService.findMany(slug);
    const {data, code, message} = response;
    return res.status(code).json({data, message});
});

router.get('/opposition/:id', async (req,res)=>{
    const {id} = req.params;
    const response = await oppositionsService.findById(id);
    const {data, code, message} = response;
    return res.status(code).json({data, message});
});

router.post('/opposition', async (req,res)=>{
    const {firstAuthorId, secondAuthorId} = req.body;
    const response = await oppositionsService.create({firstAuthorId, secondAuthorId});
    const {data, code, message} = response;
    return res.status(code).json({data, message});
});

router.patch('/opposition/:id', async (req,res)=>{
    const {firstAuthorId, secondAuthorId} = req.body;
    const {id} = req.params;
    const response = await oppositionsService.updateOne(id, {firstAuthorId, secondAuthorId});
    const {data, code, message} = response;
    return res.status(code).json({data, message});
});

router.delete('/opposition/:id', async (req,res)=>{
    const {id} = req.params;
    const response = await oppositionsService.deleteOne(id);
    const {data, code, message} = response;
    return res.status(code).json({data, message});
});

export {router as OppositionsRoutes};