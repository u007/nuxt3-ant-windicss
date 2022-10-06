
export enum TaskStatusEnum {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum TaskPriorityEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export class Task {
  id: number;
  name: string;
  description: string;
  status: TaskStatusEnum;
  priority: TaskPriorityEnum;
  createdAt: Date;
  updatedAt: Date;
}
