import express from 'express';
import {authorsServiceFactory} from '../factories/authors.service.factory';

const router = express.Router();
const authorsService = authorsServiceFactory();

router.get('/authors', async(req,res)=>{
    const name = req.query.name as string | undefined;
    const response = await authorsService.findMany(name);
    const {data, code, message} = response;
    return res.status(code).json({data, message});
});

router.get('/author/:id', async(req,res)=>{
    const {id} = req.params;
    const response = await authorsService.findById(id);
    const {data, code, message} = response;
    return res.status(code).json({data, message});
});

router.post('/author', async (req,res)=>{
    const {name, description} = req.body;
    const response = await authorsService.create(name, description);
    const {data, code, message} = response;
    return res.status(code).json({data, message});
});

router.delete('/author/:id', async (req,res)=>{
    const {id} = req.params;
    const response = await authorsService.deleteOne(id);
    const {data, code, message} = response;
    return res.status(code).json({data, message});
});

export {router as AuthorsRoutes};