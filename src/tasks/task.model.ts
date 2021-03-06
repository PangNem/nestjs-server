export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export const testTasks: Task[] = [
  {
    id: 1,
    title: '1',
    description: '1',
    status: TaskStatus.OPEN,
  },
  {
    id: 2,
    title: '2',
    description: '2',
    status: TaskStatus.IN_PROGRESS,
  },
  {
    id: 3,
    title: '3',
    description: '3',
    status: TaskStatus.DONE,
  },
];
