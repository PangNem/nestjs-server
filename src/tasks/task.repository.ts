import { Repository, EntityRepository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.model';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks() {
    return this.createQueryBuilder('task').getMany();
  }
  async createTask(createTaskDTO: CreateTaskDTO) {
    const { title, description } = createTaskDTO;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await task.save();
    return task;
  }
}
