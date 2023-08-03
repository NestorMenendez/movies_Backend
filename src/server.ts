import express, {Request, Response} from 'express';
import morgan from 'morgan'
import config from "./config/config";
import userRoutes from './routes/user.routes';
import moviesRoutes from './routes/movies.routes';
import genresRoutes from './routes/genres.routes';

const app: express.Application = express();

app.use(express.json());
app.use(morgan('dev'))

app.use('/user', userRoutes);
app.use('/movies', moviesRoutes);
app.use('/genres', genresRoutes);


const PORT: string | number = config.app.PORT


export default app;