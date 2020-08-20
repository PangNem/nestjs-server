import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TaskStatus, testTasks } from './../../src/tasks/task.model';
import { TasksModule } from './../../src/tasks/tasks.module';

describe('TaskController (e2e)', () => {
  let app: INestApplication;

  const deepCopiedTestTasks = Array.from(testTasks);
  const newTaskInfo = { title: '4', description: '4' };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TasksModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('get all tasks', () => {
    it('/tasks', () => {
      return request(app.getHttpServer())
        .get('/tasks')
        .expect(200);
    });
  });

  describe('get a task by id', () => {
    it('/tasks/:id', () => {
      return request(app.getHttpServer())
        .get('/tasks/1')
        .expect(200);
    });
  });

  describe('create a task and return its task', () => {
    it('/tasks', () => {
      return request(app.getHttpServer())
        .post('/tasks')
        .send(newTaskInfo)
        .expect(201)
        .expect({ ...newTaskInfo, id: '4', status: TaskStatus.OPEN });
    });
  });

  describe('update a created task and return its task', () => {
    it('/tasks', () => {
      return request(app.getHttpServer())
        .put('/tasks/4')
        .send({ status: TaskStatus.IN_PROGRESS })
        .expect(200);
    });
  });

  describe('delete a task and return tasks', () => {
    it('/tasks', () => {
      return request(app.getHttpServer())
        .delete('/tasks/4')
        .expect(200)
        .expect(deepCopiedTestTasks);
    });
  });
});
