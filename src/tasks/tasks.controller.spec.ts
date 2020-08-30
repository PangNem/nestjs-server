import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '..//tasks/tasks.controller';
import { TasksService } from '..//tasks/tasks.service';
import { testTasks, TaskStatus } from './task.model';

describe('TasksController', () => {
  let tasksController: TasksController;

  const deepCopiedTestTasks = Array.from(testTasks);

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    tasksController = app.get<TasksController>(TasksController);
  });

  describe('GET /tasks', () => {
    it('sholud be return all tasks', () => {
      expect(tasksController.getAllTasks()).toEqual(deepCopiedTestTasks);
    });
  });
  describe('GET /tasks/:id', () => {
    it('sholud be return a task by id', () => {
      expect(tasksController.getTaskById('1')).toEqual(deepCopiedTestTasks[0]);
    });
  });

  const newTaskInfo = { title: '4', description: '4' };
  const newCreatedTask = { ...newTaskInfo, id: '4', status: TaskStatus.OPEN };

  describe('POST /tasks', () => {
    it('should be create a task', () => {
      expect(tasksController.createTask(newTaskInfo)).toEqual(newCreatedTask);
    });
  });

  describe('PUT /tasks', () => {
    it('should be update a task', () => {
      expect(
        tasksController.updateTaskStatusById('1', TaskStatus.IN_PROGRESS),
      ).toEqual({ ...testTasks[0], status: TaskStatus.IN_PROGRESS });
    });
  });

  describe('DELETE /tasks', () => {
    it('should be delete a task', () => {
      expect(tasksController.deleteTaskById('4')).toEqual(deepCopiedTestTasks);
    });
  });
});
