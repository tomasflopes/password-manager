import express from 'express';
import cors from 'cors';

import morgan from 'morgan';

import authRoutes from './routes/auth.routes';
import privateRoutes from './routes/private.routes';

import authMiddleware from './middleware/auth.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use(authMiddleware, privateRoutes);

export default app;
