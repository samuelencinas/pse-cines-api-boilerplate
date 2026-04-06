import { Router } from 'express';
import { findMovies, findCinemas } from '../controllers/index'; 

const router = Router();

// /movies/
router.post('/movies', findMovies);

// /cinemas/
router.post('/cinemas', findCinemas);

// Exportamos el router
export default router;