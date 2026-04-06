import { prisma } from '../lib/db';
import type { MovieFiltersDto, MovieResponseDto } from '../dto/movie.dto';
import moment from 'moment';
import type { Movie } from '@prisma/client';

/**
 * Lógica de negocio de películas
 */
export const MovieService = {

  // Obtención de películas
  async getMovies(filters: MovieFiltersDto): Promise<MovieResponseDto[]> {
    const { id, sessionBefore, sessionAfter, cast } = filters;

    // No se especifica el tipo de "movies" para que se produzca la inferencia automática
    const movies = await prisma.movie.findMany({
      where: {
        id: id,
        // Filtramos por las fechas dentro de la tabla intermedia
        showTimings: (sessionBefore || sessionAfter) ? {
          some: {
            day: {
              gte: sessionAfter,
              lte: sessionBefore,
            }
          }
        } : undefined
      },
      include: {
        showTimings: {
          include: {
            theater: true, // Para sacar el nombre del cine
            timing: true   // Para sacar las horas
          }
        }
      }
    });

    // Mapeamos el resultado para que coincida con nuestro DTO de respuesta
    let results: MovieResponseDto[] = movies.map((movie) => ({
      id: movie.id,
      title: movie.name,
      cast: movie.actors,
      sessions: movie.showTimings && movie.showTimings.length > 0 ? movie.showTimings.map(st => ({
        cinema: st.theater.name,
        day: moment(st.day).format('DD/MM/YYYY'),
        start: st.timing.start_time,
        end: st.timing.end_time
      })) : undefined
    }));

    // Filtrado a posteriori por el reparto
    if (cast && cast.length > 0) {
      results = results.filter(movie => {
        const movieActors = movie.cast.split(',').map(a => a.trim());
        return cast.every((a: string) => movieActors.includes(a));
      });
    }

    // Devolución de resultados mapeados
    return results;
  }

  // TO-DO: Actualización de películas

  // TO-DO: Borrado de películas

  // TO-DO: Creación de películas
};