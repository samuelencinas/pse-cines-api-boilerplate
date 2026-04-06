import express from 'express';
import { prisma } from './lib/db'
import cors from 'cors';
import { findMovies, findCinemas } from './controllers';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Endpoints
app.post('/movies', findMovies);
app.post('/cinemas', findCinemas);

app.listen(3001);