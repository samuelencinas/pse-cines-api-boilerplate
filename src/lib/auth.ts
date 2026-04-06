import { Strategy, ExtractJwt } from "passport-jwt";
import type { StrategyOptions } from "passport-jwt";
import { prisma } from "./db";
import type { User } from "@prisma/client";

const options: StrategyOptions = {
    // El JWT se extrae de la header como un token Bearer
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'mi_clave_super_secreta'
};

// Configuración de la estrategia JWT para Passport (Strategy viene importado de passport-jwt)
export const JWTStrategy = new Strategy(options, async (payload, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: payload.sub },
            select: { id: true, username: true, role: true } // Evitar recibir hash (es innecesario)
        });
        if (user) return done(null, user); // <-- Usuario validado
        return done(null, false); // <-- Usuario no encontrado
    } catch (error) {
        return done(null, payload);
    }
});
