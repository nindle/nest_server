import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private readonly Article: Repository<Article>,
  ) {}

  create(createArticleDto: CreateArticleDto) {
    const data = new Article();
    data.author = createArticleDto?.author ?? '';
    data.avatar = createArticleDto?.avatar ?? '';
    data.content = createArticleDto?.content ?? '';
    data.cover_picture = createArticleDto?.cover_picture ?? '';
    data.title = createArticleDto?.title ?? '';
    return this.Article.save(data);
  }

  findAll() {
    return this.Article.find();
  }

  findOne(id: number) {
    return this.Article.find({
      where: {
        id: Like(`%${id}%`),
      },
    });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.Article.update(id, updateArticleDto);
  }

  remove(id: number) {
    return this.Article.delete(id);
  }
}
