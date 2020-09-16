import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getAllTasks() {
    return this.taskRepository.getTasks();
  }

  async getTaskById(id: number) {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID '${id}' not found.`);
    }

    return found;
  }

  async createTask(createTaskDTO: CreateTaskDTO) {
    return this.taskRepository.createTask(createTaskDTO);
  }

  async deleteTaskById(id: number) {
    const result = await this.taskRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Task with ID '${id}' not found.`);
    }

    return this.taskRepository.getTasks();
  }
  async updateTaskStatusById(id: number, status: TaskStatus) {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
