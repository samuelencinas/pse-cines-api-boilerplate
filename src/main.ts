import express from 'express';
import cors from 'cors';
import publicRouter from './middlewares/publicRouter';
import protectedRouter from './middlewares/protectedRouter';
import passport from 'passport';
import { JWTStrategy } from './lib/auth';

const app = express();

// Middlewares
app.use(cors()); // <-- Middleware #1: CORS (sin configurar)
app.use(express.json()); // <-- Middleware #2: JSON
passport.use('jwt', JWTStrategy); // <-- Configuramos Passport con nuestra estrategia JWT personalizada
app.use(passport.initialize()); // <-- Middleware #3: Passport (para autenticación)
app.use(publicRouter); // <-- Middleware #4: Router de rutas públicas (sin autenticación)
app.use(protectedRouter); // <-- Middleware #5: Router de rutas protegidas (con autenticación)

// Arranque del servidor
app.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
});