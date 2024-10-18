import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { MovieReviewService } from './movie-review.service';
import { PaginatedResult } from './dtos/paginated-result.dto';
import { MovieReview } from './movie-review.entity';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('movie-reviews')
@Controller('movie-reviews')
export class MovieReviewController {
  constructor(private readonly movieReviewService: MovieReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova resenha de filme' })
  @ApiResponse({
    status: 201,
    description: 'Resenha de filme criada com sucesso.',
  })
  async createReview(
    @Body('title') title: string,
    @Body('notes') notes: string,
  ): Promise<MovieReview> {
    return this.movieReviewService.createMovieReview(title, notes);
  }

  // @Get()
  // async getAllReviews(): Promise<MovieReview[]> {
  //   return this.movieReviewService.getAllMovieReviews();
  // }

  @Get(':id')
  @ApiOperation({ summary: 'Listar a resenha conforme o  id do filme.' })
  @ApiResponse({
    status: 200,
    description: 'Listar a resenha conforme o  id do filme.',
  })
  async getReviewById(@Param('id') id: number): Promise<MovieReview> {
    return this.movieReviewService.getMovieReviewById(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualiza a resenha e o Título conforme o  id do filme.',
  })
  @ApiResponse({
    status: 200,
    description: 'Atualiza a resenha e o Título conforme o  id do filme.',
  })
  async updateReview(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('notes') notes: string,
  ): Promise<MovieReview> {
    return this.movieReviewService.updateMovieReview(id, title, notes);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deleta a resenha do banco de dados conforme o  id do filme.',
  })
  @ApiResponse({
    status: 200,
    description: 'Deleta a resenha do banco de dados conforme o  id do filme.',
  })
  async deleteReview(@Param('id') id: number): Promise<void> {
    return this.movieReviewService.deleteMovieReview(id);
  }

  @Get('filter')
  @ApiOperation({ summary: 'Filtrar e ordenar reviews de filmes' })
  @ApiQuery({
    name: 'title',
    required: false,
    description: 'Título do filme para filtrar',
  })
  @ApiQuery({
    name: 'releaseDate',
    required: false,
    description: 'Data de lançamento para filtrar',
  })
  @ApiQuery({
    name: 'imdbRating',
    required: false,
    description: 'Nota do IMDb para filtrar',
  })
  @ApiQuery({
    name: 'actors',
    required: false,
    description: 'Ator(es) do filme para filtrar',
  })
  @ApiQuery({
    name: 'director',
    required: false,
    description: 'Diretor(es) do filme para filtrar',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Campo para ordenar (title, releaseDate, imdbRating)',
  })
  @ApiQuery({
    name: 'order',
    enum: ['ASC', 'DESC'],
    required: false,
    description: 'Ordem da ordenação (ASC ou DESC)',
  })
  @ApiQuery({
    name: 'order',
    enum: ['ASC', 'DESC'],
    required: false,
    description: 'Ordem da ordenação (ASC ou DESC)',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de reviews filtrados e ordenados',
    type: [MovieReview],
  })
  async getFilteredAndSortedReviews(
    @Query('title') title?: string,
    @Query('releaseDate') releaseDate?: string,
    @Query('imdbRating') imdbRating?: number,
    @Query('actors') actors?: string,
    @Query('director') director?: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<MovieReview[]> {
    return this.movieReviewService.getFilteredAndSortedReviews(
      title,
      releaseDate,
      imdbRating,
      actors,
      director,
      sortBy,
      order,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as resenhas de filmes' })
  @ApiResponse({ status: 200, description: 'Lista de resenhas de filmes.' })
  async getMovieReviews(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<PaginatedResult<MovieReview>> {
    return this.movieReviewService.getMovieReviews(page, limit);
  }
}
