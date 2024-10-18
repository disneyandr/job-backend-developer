import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieReview } from './movie-review.entity';
// import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MovieReviewService {
  private readonly omdbApiUrl: string;

  constructor(
    @InjectRepository(MovieReview)
    private movieReviewRepository: Repository<MovieReview>,
    private readonly httpService: HttpService,
  ) {
    if (!process.env.OMDB_API_KEY) {
      throw new Error('OMDB API Key não está definida');
    }
    this.omdbApiUrl = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=`;
  }

  async createMovieReview(title: string, notes: string): Promise<MovieReview> {
    const movieData = await this.fetchMovieData(title);

    const movieReview = new MovieReview();
    movieReview.title = title;
    movieReview.releaseDate = movieData.Released;
    movieReview.imdbRating = movieData.imdbRating;
    movieReview.notes = notes;
    movieReview.actors = movieData.Actors; // Novo campo
    movieReview.director = movieData.Director; // Novo campo

    return this.movieReviewRepository.save(movieReview);
  }

  private async fetchMovieData(title: string): Promise<any> {
    try {
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.get(`${this.omdbApiUrl}${title}`),
      );
      return response.data;
    } catch (error) {
      console.error(
        `Falha ao buscar dados do filme para o título: ${title}`,
        error,
      );
      throw new Error('Falha ao buscar dados de filmes da API OMDB');
    }
  }

  async getAllMovieReviews(): Promise<MovieReview[]> {
    return this.movieReviewRepository.find();
  }

  async getMovieReviewById(id: number): Promise<MovieReview> {
    return this.movieReviewRepository.findOne({ where: { id } });
  }

  // src/movie-reviews/movie-review.service.ts

async updateMovieReview(
  id: number,
  title: string,
  notes: string,
): Promise<MovieReview> {
  const movieReview = await this.getMovieReviewById(id);
  if (!movieReview) {
    throw new Error(`Movie review com ID ${id} não foi encontrado.`);
  }

  // Busca os dados do filme na OMDB
  const movieData = await this.fetchMovieData(title);

  if (!movieData.Response || movieData.Response === "False") {
    throw new Error(`Erro ao buscar dados do filme: ${movieData.Error}`);
  }

  movieReview.title = title;
  movieReview.releaseDate = movieData.Released;
  movieReview.imdbRating = movieData.imdbRating;
  movieReview.notes = notes;

  // Atualizando os campos actors e director a partir da resposta da OMDB
  movieReview.actors = movieData.Actors;  
  movieReview.director = movieData.Director;  

  return this.movieReviewRepository.save(movieReview);
}


  async deleteMovieReview(id: number): Promise<void> {
    await this.movieReviewRepository.delete(id);
  }

  async getFilteredAndSortedReviews(
    title?: string,
    releaseDate?: string,
    imdbRating?: number,
    actors?: string,
    director?: string,
    sortBy: string = 'title',
    order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<MovieReview[]> {
    const queryBuilder =
      this.movieReviewRepository.createQueryBuilder('review');

    //filtros
    if (title) {
      queryBuilder.andWhere('review.title LIKE :title', {
        title: `%${title}%`,
      });
    }
    if (releaseDate) {
      queryBuilder.andWhere('review.releaseDate = :releaseDate', {
        releaseDate,
      });
    }
    if (imdbRating) {
      queryBuilder.andWhere('review.imdbRating >= :imdbRating', { imdbRating });
    }

    if(actors){
      queryBuilder.andWhere('review.actors LIKE :actors', {actors: `%${actors}%`});
    }
    if (director) {
      queryBuilder.andWhere('review.director LIKE :director', {director: `%${director}%`})
    }
    //ordenação
    queryBuilder.orderBy(`review.${sortBy}`, order);

    return queryBuilder.getMany();
  }
}
