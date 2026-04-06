import type { Request, Response } from 'express';
import { CinemaService } from '../services/cinema.service';
import { MovieService } from '../services/movie.service';
import type { CinemaFiltersDto, CinemaResponseDto } from '../dto/cinema.dto';
import type { MovieFiltersDto, MovieResponseDto } from '../dto/movie.dto';

/**
 * Gestiona la búsqueda de cines con filtros opcionales
 */
export const findCinemas = async (req: Request, res: Response): Promise<void> => {
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

/**
 * Gestiona la búsqueda de películas y sus sesiones
 */
export const findMovies = async (req: Request, res: Response): Promise<void> => {
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