import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MovieReviewModule } from './movie-reviews/movie-review.module';
import { MovieReview } from './movie-reviews/movie-review.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [MovieReview],
      synchronize: true, // Não usar em produção, evitando perder dados
    }),
    MovieReviewModule,
  ],
})
export class AppModule {}
