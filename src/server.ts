import express from 'express';
import dotenv from 'dotenv'
import { AuthorsRoutes } from './routes/authors.routes';

dotenv.config();

const SERVER_PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/', AuthorsRoutes);

app.listen(SERVER_PORT, ()=>{
    console.log('Server running at http://localhost:' + SERVER_PORT);
});

