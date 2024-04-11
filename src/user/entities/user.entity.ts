import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn()
  id: number;

  @Column({
    comment: '用户名',
    length: 50,
  })
  username: string;

  @Column({
    comment: '密码',
    length: 200,
  })
  password: string;

  @Column({
    comment: '姓名',
    length: 50,
  })
  name: string;

  @Column({
    comment: '头像',
    length: 200,
    nullable: true,
  })
  avatar: string;

  @Column({
    comment: '性别',
    type: 'enum',
  })
  @Column({
    comment: '手机号',
    length: 20,
    nullable: true,
  })
  phone: string;

  @Column({
    comment: '部门名称',
    length: 50,
    nullable: true,
  })
  department?: string;

  @Column({
    comment: '部门id',
    nullable: true,
  })
  departmentId?: number;

  @Column({
    comment: '最近登录时间',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastLoginAt: Date;

  @Column({
    comment: '是否删除',
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;
}
