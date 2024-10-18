import { ApiProperty } from "@nestjs/swagger";

export class PaginatedResult<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;

  constructor(
    data: T[],
    totalItems: number,
    totalPages: number,
    currentPage: number,
  ) {
    this.data = data;
    this.totalItems = totalItems;
    this.totalPages = totalPages;
    this.currentPage = currentPage;
  }
}

export class CreateMovieReviewDto {
  @ApiProperty({ description: 'Título do filme' })
  title: string;

  @ApiProperty({ description: 'Notas sobre o filme' })
  notes: string;

  // Adicione mais propriedades se necessário
}
