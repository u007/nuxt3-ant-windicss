
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

export type Task = {
  id: number
  title: string
  description: string
  status: TaskStatusEnum
  priority: TaskPriorityEnum
  createdAt: Date
  updatedAt: DateConstructor
}
