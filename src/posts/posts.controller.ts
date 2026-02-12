import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Patch,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import type { RequestWithUser } from '../auth/types/request-with-user.interface';
import { GetUser } from '../auth/decorators/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() dto: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postsService.create(dto, req.user.userId);
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    return this.postsService.findAllByUser(req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('userId') userId: number) {
    return this.postsService.remove(Number(id), userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
    @GetUser('userId') userId: number,
  ) {
    return this.postsService.update(Number(id), dto, userId);
  }
}
