export interface MovieFiltersDto {
  id?: number;
  sessionBefore?: Date;
  sessionAfter?: Date;
  cast?: string[];
}

export interface MovieResponseDto {
  id: number;
  title: string;
  cast: string;
  sessions?: Array<{
    cinema: string;
    day: string;
    start: string;
    end: string;
  }>;
}