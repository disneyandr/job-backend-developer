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


@Controller('movie-reviews')
export class MovieReviewController {
  constructor(private readonly movieReviewService: MovieReviewService) {}

  @Post()
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
  async getReviewById(@Param('id') id: number): Promise<MovieReview> {
    return this.movieReviewService.getMovieReviewById(id);
  }

  @Put(':id')
  async updateReview(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('notes') notes: string,
  ): Promise<MovieReview> {
    return this.movieReviewService.updateMovieReview(id, title, notes);
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: number): Promise<void> {
    return this.movieReviewService.deleteMovieReview(id);
  }

  @Get('filter')
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
  async getMovieReviews(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<PaginatedResult<MovieReview>> {
    return this.movieReviewService.getMovieReviews(page, limit);
  }
}
