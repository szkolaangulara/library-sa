import {Injectable} from '@angular/core';

import {Observable, of, Subject} from 'rxjs';

import {Task} from '@app/models/task.interface';
import {TaskStatus} from '@app/enums/task-status.enum';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private static taskInstanceCounter: number = 3;
  public newTaskAdded$: Subject<boolean> = new Subject<boolean>();
  private dailyTasks: Task[] = this.prepareDailyTasks();

  public addNewTask(task: Task): void {
    task.id = TaskService.taskInstanceCounter;
    TaskService.taskInstanceCounter++;

    this.dailyTasks.push(task);
    this.newTaskAdded$.next();
  }

  public fetchDailyTasks(): Observable<Task[]> {
    return of(this.dailyTasks.filter((task: Task) => task.status === TaskStatus.NEW));
  }

  public updateTask(taskToUpdate: Task): Observable<Task[]> {
    return of(this.dailyTasks.filter((task: Task) => task.status === TaskStatus.NEW));
  }

  private prepareDailyTasks(): Task[] {
    return [
      {
        id: 1,
        name: 'Zadzwonić do 10 klientów',
        description: 'Skontaktować się z 10 klientami, którzy wyrazili w ostatnim tygodniu chęć zakupu samochodu',
        status: TaskStatus.NEW,
      },
      {
        id: 2,
        name: 'Wysłać aneks do umowy dla Pana Jana Kowalskiego',
        description: 'Pan Jan Kowalski jest zainteresowany zakupem samochodów do floty. Wysłać aneks do umowy.',
        status: TaskStatus.NEW,
      }
    ]
  }
}

