import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { testTasks, TaskStatus } from './task.model';

describe('TasksService', () => {
  let service: TasksService;

  const deepCopiedTestTasks = Array.from(testTasks);
  const newTaskInfo = { title: '4', description: '4' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  describe('getAllTasks', () => {
    it('get all tasks from an temporary array', () => {
      expect(service.getAllTasks()).toEqual(testTasks);
    });
  });

  describe('getTaskById', () => {
    it('get a task by id', () => {
      expect(service.getTaskById('1')).toEqual(testTasks[0]);
    });
  });

  describe('createTask', () => {
    it('create a new task and return its task', () => {
      expect(service.createTask(newTaskInfo)).toEqual({
        ...newTaskInfo,
        id: '4',
        status: TaskStatus.OPEN,
      });
    });
  });

  describe('updateTaskStatus', () => {
    it('update a created task', () => {
      expect(service.updateTaskStatusById('4', TaskStatus.IN_PROGRESS)).toEqual(
        {
          ...newTaskInfo,
          id: '4',
          status: TaskStatus.IN_PROGRESS,
        },
      );
    });
  });

  describe('deleteTask', () => {
    it('delete a task by id', () => {
      expect(service.deleteTaskById('4')).toEqual(deepCopiedTestTasks);
    });
  });
});
