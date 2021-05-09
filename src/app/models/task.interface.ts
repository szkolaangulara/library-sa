import {TaskStatus} from '@app/enums/task-status.enum';

export interface Task {
  id?: number;
  name: string;
  description: string;
  status: TaskStatus;
}
