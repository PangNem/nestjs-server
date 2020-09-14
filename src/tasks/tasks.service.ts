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

// import { Injectable } from '@nestjs/common';
// import { Task, testTasks, TaskStatus } from './task.model';
// import { CreateTaskDTO } from './dto/create-task.dto';

// @Injectable()
// export class TasksService {
//   private tasks: Task[] = testTasks;

//   getAllTasks(): Task[] {
//     return this.tasks;
//   }
//   getTaskById(id: string): Task {
//     return this.tasks.filter(task => task.id === id)[0];
//   }

//   createTask(createTaskDTO: CreateTaskDTO): Task {
//     const { title, description } = createTaskDTO;

//     const task: Task = {
//       id: (this.tasks.length + 1).toString(),
//       title,
//       description,
//       status: TaskStatus.OPEN,
//     };

//     this.tasks.push(task);
//     return task;
//   }

//   updateTaskStatusById(id: string, status: TaskStatus): Task {
//     const task = this.getTaskById(id);
//     task.status = status;

//     return task;
//   }

//   deleteTaskById(id: string): Task[] {
//     this.tasks = this.tasks.filter(task => task.id !== id);
//     return this.tasks;
//   }
// }
