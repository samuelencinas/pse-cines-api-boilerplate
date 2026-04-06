import { prisma } from '../lib/db';
import type { CinemaFiltersDto, CinemaResponseDto } from '../dto/cinema.dto';
import moment from 'moment';

export const CinemaService = {

  // Obtención de cines
  async getCinemas(filters: CinemaFiltersDto): Promise<CinemaResponseDto[]> {
    const { id, sessionBefore, sessionAfter, withMovie, withCatalog } = filters;

    // Filtrado de fechas
    const dateGte: Date | undefined = sessionAfter ? new Date(sessionAfter) : undefined;
    const dateLte = sessionBefore ? new Date(sessionBefore) : undefined;

    const theaters = await prisma.theater.findMany({
      where: {
        id: filters.id,
        ...( (dateGte || dateLte || withMovie) && {
          showTimings: {
            some: {
              ...(dateGte || dateLte ? { day: { gte: dateGte, lte: dateLte } } : {}),
              ...(withMovie ? { movie_id: withMovie } : {})
            }
          }
        })
      },
      include: {
        // Solo incluimos la tabla intermedia si se pide el catálogo
        showTimings: withCatalog ? {
          where: {
            ...(dateGte || dateLte ? { day: { gte: dateGte, lte: dateLte } } : {}),
            ...(withMovie ? { movie_id: withMovie } : {})
          },
          include: {
            movie: true,
            timing: true
          }
        } : undefined // IMPORTANTE: Usamos undefined para no incluir
      }
    });

    // Mapeo profesional para devolver lo que la API espera (CinemaResponseDto)
    return theaters.map(theater => {
      const response: CinemaResponseDto = {
        id: theater.id,
        name: theater.name,
        capacity: theater.capacity
      };

      if (withCatalog && theater.showTimings) {
        const movieMap = new Map<number, any>();

        theater.showTimings.forEach((st: any) => {
          if (!movieMap.has(st.movie_id)) {
            movieMap.set(st.movie_id, {
              id: st.movie.id,
              title: st.movie.name,
              sessions: []
            });
          }
          
          movieMap.get(st.movie_id).sessions.push({
            date: moment(st.day).format('DD/MM/YYYY'),
            start: st.timing.start_time,
            end: st.timing.end_time
          });
        });

        response.catalog = Array.from(movieMap.values());
      }

      return response;
    });
  },

  // TO-DO: Actualización de cines

  // TO-DO: Borrado de cines

  // TO-DO: Creación de cines
};