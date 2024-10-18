import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieReviewService } from './movie-review.service';
import { MovieReviewController } from './movie-review.controller';
import { MovieReview } from './movie-review.entity';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieReview]), // Register MovieReview entity
    HttpModule, // Import HttpModule
  ],
  providers: [MovieReviewService],
  controllers: [MovieReviewController],
})
export class MovieReviewModule {}
