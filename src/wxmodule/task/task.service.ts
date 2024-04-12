import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly Task: Repository<Task>,
  ) {}

  addTask(createTaskDto: CreateTaskDto) {
    const data = new Task();
    data.taskName = createTaskDto?.taskName ?? '';
    data.endTime = createTaskDto?.endTime ?? '';
    data.state = createTaskDto?.state ?? false;
    this.Task.save(data);
    return '添加成功';
  }

  findAll() {
    return this.Task.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
