import express from 'express';
import morgan from 'morgan'
import helmet from "helmet";
import cors from 'cors';
import fileUpload from 'express-fileupload';
import userRoutes from './routes/user.routes';
import moviesRoutes from './routes/movies.routes';
import genresRoutes from './routes/genres.routes';
import { checkJwtMiddleware } from './middleware/checkJwt.middleware';


const app: express.Application = express();

app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}));

app.use('/user', userRoutes);
app.use('/movies', moviesRoutes);
app.use('/genres', genresRoutes);


export default app;