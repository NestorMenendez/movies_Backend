import express, {Request, Response} from 'express';
import config from "./config/config";
import userRoutes from './routes/user.routes';

const app: express.Application = express();

app.use(express.json);
app.use('/user', userRoutes);


const PORT: string | number = config.app.PORT


export default app;