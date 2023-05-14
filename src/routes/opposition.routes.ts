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

router.post('/opposition', async (req,res)=>{
    const {firstAuthorId, secondAuthorId} = req.body;
    const response = await oppositionsService.create({firstAuthorId, secondAuthorId});
    const {data, code, message} = response;
    return res.status(code).json({data, message});
});

export {router as OppositionsRoutes};