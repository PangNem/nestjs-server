import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TaskStatus, testTasks } from './../../src/tasks/task.model';
import { TasksModule } from './../../src/tasks/tasks.module';

describe('TaskController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TasksModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /tasks', () => {
    it('should be return all tasks', () => {
      return request(app.getHttpServer())
        .get('/tasks')
        .expect(200);
    });
  });

  describe('GET /tasks/:id ', () => {
    it('should be get a task by id', () => {
      return request(app.getHttpServer())
        .get('/tasks/1')
        .expect(200);
    });
  });

  const deepCopiedTestTasks = Array.from(testTasks);

  describe('POST /tasks', () => {
    it('should be create a task and return all task', () => {
      const newTaskInfo = { title: '4', description: '4' };

      return request(app.getHttpServer())
        .post('/tasks')
        .send(newTaskInfo)
        .expect(201)
        .expect({ ...newTaskInfo, id: '4', status: TaskStatus.OPEN });
    });
  });

  describe('PUT /tasks/:id', () => {
    it('should be error with unexpected status', () => {
      return request(app.getHttpServer())
        .put('/tasks/2')
        .send({ status: TaskStatus.IN_PROGRESS + 'TEST' })
        .expect(400);
    });

    it('should be update a task and return its task', () => {
      return request(app.getHttpServer())
        .put('/tasks/4')
        .send({ status: TaskStatus.IN_PROGRESS })
        .expect(200);
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('should be delete a task and return all tasks', () => {
      return request(app.getHttpServer())
        .delete('/tasks/4')
        .expect(200)
        .expect(deepCopiedTestTasks);
    });
  });
});
