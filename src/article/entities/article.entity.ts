import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number | string;

  @Column({ comment: '标题', length: 30 })
  title?: string;

  @Column({ comment: '内容', length: 1000 })
  content?: string;

  @Column({ comment: '作者', length: 6 })
  author?: string;

  @Column({ comment: '封面' })
  cover_picture?: string;

  @Column({ comment: '头像' })
  avatar?: string;
}
