import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text' })
  content!: string;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  user!: User;
}
