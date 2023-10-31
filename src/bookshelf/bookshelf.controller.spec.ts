import { Test, TestingModule } from '@nestjs/testing';
import { BookshelfController } from './bookshelf.controller';
import { BookshelfService } from './bookshelf.service';

describe('BookshelfController', () => {
  let controller: BookshelfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookshelfController],
      providers: [BookshelfService],
    }).compile();

    controller = module.get<BookshelfController>(BookshelfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
