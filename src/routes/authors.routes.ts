import express from 'express';
import {authorsServiceFactory} from '../factories/authors.service.factory';

const router = express.Router();
const authorsService = authorsServiceFactory();

router.post('/author', async (req,res)=>{
    const {name} = req.body;
    const response = await authorsService.create(name);
    const {data, code, message} = response;
    return res.status(code).json({data, message});
});

export {router as AuthorsRoutes};