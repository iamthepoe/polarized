import express from 'express';
import {authorsServiceFactory} from '../factories/authors.service.factory';

const router = express.Router();
const authorsService = authorsServiceFactory();
