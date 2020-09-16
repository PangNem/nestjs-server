import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { testTasks, TaskStatus } from './task.model';
import { TaskRepository } from './task.repository';
import { NotFoundException } from '@nestjs/common';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn(),
});

describe('TasksService', () => {
  let tasksService, taskRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTask', () => {
    it('gets all tasks from repository', async () => {
      taskRepository.getTasks.mockResolvedValue('some value');
      expect(taskRepository.getTasks).not.toHaveBeenCalled();
      const result = await tasksService.getAllTasks();

      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('some value');
    });
  });

  describe('getTaskById', () => {
    it('throw an error if id not found', () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById(1)).rejects.toThrow(NotFoundException);
    });
    it('calls taskRepository.findOne() and return its task', async () => {
      const mockTest = { title: 'test', description: 'test desc' };
      taskRepository.findOne.mockResolvedValue(mockTest);

      const result = await tasksService.getTaskById(1);
      expect(result).toEqual(mockTest);
    });
  });

  describe('createTask', () => {
    it('calls taskRepository.createTask() and return the result', async () => {
      taskRepository.createTask.mockResolvedValue('new task');
      expect(taskRepository.createTask).not.toHaveBeenCalled();

      const createTaskDTO = { title: 'test', description: 'test desc' };
      const result = await tasksService.createTask(createTaskDTO);

      expect(taskRepository.createTask).toHaveBeenCalled();
      expect(taskRepository.createTask).toHaveBeenCalledWith(createTaskDTO);

      expect(result).toEqual('new task');
    });
  });

  describe('deleteTaskById', () => {
    it('calls taskRepository.delete() and check it called', async () => {
      taskRepository.delete.mockResolvedValue({ affected: 1 });
      expect(taskRepository.delete).not.toHaveBeenCalled();
      await tasksService.deleteTaskById(1);

      expect(taskRepository.delete).toHaveBeenCalled();
      expect(taskRepository.delete).toHaveBeenCalledWith(1);
    });
    it('throw an error if task could not be found', () => {
      taskRepository.delete.mockResolvedValue({ affected: 0 });
      expect(tasksService.deleteTaskById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateTaskStatausById', () => {
    it('calls taskRepository.getTaskById() and return saved task', async () => {
      const save = jest.fn().mockResolvedValue(true);

      tasksService.getTaskById = jest.fn().mockResolvedValue({
        status: TaskStatus.OPEN,
        save,
      });

      expect(tasksService.getTaskById).not.toHaveBeenCalled();
      expect(save).not.toHaveBeenCalled();

      const result = await tasksService.updateTaskStatusById(
        1,
        TaskStatus.DONE,
      );

      expect(tasksService.getTaskById).toHaveBeenCalled();
      expect(result.status).toEqual(TaskStatus.DONE);
      expect(save).toBeCalled();
    });
  });
});
