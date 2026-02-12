import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(dto: CreatePostDto) {
    const post = this.postsRepository.create(dto);
    return this.postsRepository.save(post);
  }

  async findAll() {
    return this.postsRepository.find();
  }

  async findOne(id: number) {
    return this.postsRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    return this.postsRepository.delete(id);
  }
}