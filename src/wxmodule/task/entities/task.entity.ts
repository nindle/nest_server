import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '任务名',
    length: 20,
  })
  taskName: string;

  @Column({
    comment: '结束时间',
  })
  endTime: string;

  @CreateDateColumn({ comment: '创建时间', type: 'timestamp' })
  creatTime: Date;

  @Column({
    comment: '状态',
  })
  state: boolean;
}
