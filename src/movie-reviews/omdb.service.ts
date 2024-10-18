import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class OmdbService {
  constructor(private readonly httpService: HttpService) {}
  async getMovieData(title: string) {
    const url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${encodeURI(title)}`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }
}
    