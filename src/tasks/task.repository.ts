import { Repository, EntityRepository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  constructor() {
    super();
  }
  async getTasks() {
    const query = this.createQueryBuilder('task');
    return query.getMany();
  }
  async createTask(createTaskDTO: CreateTaskDTO) {}
}
