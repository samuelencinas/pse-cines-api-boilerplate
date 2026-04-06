import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

/**
 * Middleware: Public Router
 * 
 * Implementación de un Express Router personalizado para rutas públicas (sin autenticación)
 * 
 * NOTA: En este caso, no se requiere autenticación para acceder a estas rutas, por lo que no se utiliza Passport aquí.
 */

const router = Router();

// POST /register
router.post('/register', AuthController.register);

// POST /login 
router.post('/login', AuthController.login);

export default router;