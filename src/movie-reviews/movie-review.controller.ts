import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MovieReviewService } from './movie-review.service';
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

  @Get()
  async getAllReviews(): Promise<MovieReview[]> {
    return this.movieReviewService.getAllMovieReviews();
  }

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
}
