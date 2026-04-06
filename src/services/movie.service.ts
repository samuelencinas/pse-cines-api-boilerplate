import { prisma } from '../lib/db';
import type { MovieFiltersDto, MovieResponseDto } from '../dto/movie.dto';
import moment from 'moment';
import type { Movie } from '../lib/generated/prisma/client';

export const MovieService = {

  // Obtención de películas
  async getMovies(filters: MovieFiltersDto): Promise<MovieResponseDto[]> {
    const { id, sessionBefore, sessionAfter, cast } = filters;

    const movies: Movie[] = await prisma.movie.findMany({
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
    let results: MovieResponseDto[] = movies.map(movie => ({
      id: movie.id,
      title: movie.name,
      cast: movie.actors,
      sessions: movie.showTimings.map(st => ({
        cinema: st.theater.name,
        day: moment(st.day).format('DD/MM/YYYY'),
        start: st.timing.start_time,
        end: st.timing.end_time
      }))
    }));

    if (cast && cast.length > 0) {
      results = results.filter(movie => {
        const movieActors = movie.cast.split(',').map(a => a.trim());
        return cast.every((a: string) => movieActors.includes(a));
      });
    }

    return results;
  }

  // TO-DO: Actualización de películas

  // TO-DO: Borrado de películas

  // TO-DO: Creación de películas
};