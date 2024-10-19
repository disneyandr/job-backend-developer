import { Test, TestingModule } from '@nestjs/testing';
import { MovieReviewController } from './movie-review.controller';
import { MovieReviewService } from './movie-review.service';
import { PaginatedResult } from './dtos/paginated-result.dto'; // Ajuste o caminho conforme necessário

describe('MovieReviewController', () => {
  let controller: MovieReviewController;
  let service: MovieReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieReviewController],
      providers: [
        {
          provide: MovieReviewService,
          useValue: {
            getMostViewedReviews: jest.fn(), 
          },
        },
      ],
    }).compile();

    controller = module.get<MovieReviewController>(MovieReviewController);
    service = module.get<MovieReviewService>(MovieReviewService);
  });

  describe('getMostViewedReviews', () => {
    it('deve retornar uma lista de resenhas de filmes mais visualizadas', async () => {
      const result: PaginatedResult<any> = {
        data: [
          { id: 1, title: 'The Matrix', views: 3 },
          { id: 2, title: 'The Matrix Reloaded', views: 4 },
        ],
        totalItems: 2,
        totalPages: 1,
        currentPage: 1,
      };

      jest.spyOn(service, 'getMostViewedReviews').mockResolvedValue(result);

      expect(await controller.getMostViewedReviews()).toBe(result);
    });
  });
});
