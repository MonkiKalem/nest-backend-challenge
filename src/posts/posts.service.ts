import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(dto: CreatePostDto, userId: number) {
    const post = this.postsRepository.create({
      ...dto,
      user: { id: userId },
    });

    return this.postsRepository.save(post);
  }

  async findAllByUser(userId: number) {
    return this.postsRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async remove(postId: number, userId: number) {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.user.id !== userId) {
      throw new ForbiddenException('You are not allowed to delete this post');
    }

    return this.postsRepository.remove(post);
  }

  async update(postId: number, dto: UpdatePostDto, userId: number) {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.user.id !== userId) {
      throw new ForbiddenException('You are not allowed to update this post');
    }

    Object.assign(post, dto);

    return this.postsRepository.save(post);
  }
}
