import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '..//tasks/tasks.controller';
import { TasksService } from '..//tasks/tasks.service';

describe('AppController', () => {
  let tasksController: TasksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    tasksController = app.get<TasksController>(TasksController);
  });

  describe('root', () => {
    expect(1 + 1).toEqual(2);
  });
});
