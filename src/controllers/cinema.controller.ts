import type { Request, Response } from 'express';
import { CinemaService } from '../services/cinema.service';
import type { CinemaFiltersDto, CinemaResponseDto } from '../dto/cinema.dto';

/**
 * Gestiona la búsqueda de cines con filtros opcionales
 */
 const findCinemas = async (req: Request, res: Response): Promise<void> => {
    try {
        const filters: CinemaFiltersDto = req.body;
        const result: CinemaResponseDto[] = await CinemaService.getCinemas(filters);
        res.status(200).json(result);
    } catch (error) {
        console.error('[findCinemas Error]:', error);
        res.status(500).json({ 
            error: 'Error interno al obtener los cines.',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const CinemaController = {
    findCinemas,
    // TO-DO: createCinemas,
    // TO-DO: updateCinemas,
    // TO-DO: deleteCinemas
}