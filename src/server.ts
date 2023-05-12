import express from 'express';
import dotenv from 'dotenv'
import { AuthorsRoutes } from './routes/authors.routes';
import { PhrasesRoutes } from './routes/phrases.routes';

dotenv.config();

const SERVER_PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use((err, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).send({ message: err}); // Bad request
    }
    next();
});

app.use('/', AuthorsRoutes);
app.use('/', PhrasesRoutes);

app.listen(SERVER_PORT, ()=>{
    console.log('Server running at http://localhost:' + SERVER_PORT);
});
