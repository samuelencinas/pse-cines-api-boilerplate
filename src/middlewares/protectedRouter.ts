import { Router } from 'express';
import { MovieController } from '../controllers/movie.controller'; 
import passport from 'passport';
import { CinemaController } from '../controllers/cinema.controller';
import { Role } from '@prisma/client';
import { authorize } from './authorize';

/**
 * Middleware: Protected Router
 * 
 * Implementación de un Express Router personalizado para rutas protegidas
 * 
 */

const router = Router();

// POST /movies (ruta, middleware de autenticación, controller)
router.post('/movies', passport.authenticate('jwt', { session: false }), authorize([Role.CINEMA, Role.ADMIN]), MovieController.findMovies);

// POST /cinemas (ruta, middleware de autenticación, controller)
router.post('/cinemas', passport.authenticate('jwt', { session: false }), authorize([Role.CINEMA, Role.ADMIN]), CinemaController.findCinemas);

export default router;