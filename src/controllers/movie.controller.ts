import type { Request, Response } from 'express';
import { MovieService } from '../services/movie.service';
import type { MovieFiltersDto, MovieResponseDto } from '../dto/movie.dto';


/**
 * Gestiona la búsqueda de películas y sus sesiones
 */
const findMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const filters: MovieFiltersDto = req.body;
        const result: MovieResponseDto[] = await MovieService.getMovies(filters);
        res.status(200).json(result);
    } catch (error) {
        console.error('[findMovies Error]:', error);
        res.status(500).json({ 
            error: 'Error interno al obtener las películas.',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const MovieController = {
    findMovies,
    // TO-DO: createMovies,
    // TO-DO: updateMovies,
    // TO-DO: deleteMovies
};