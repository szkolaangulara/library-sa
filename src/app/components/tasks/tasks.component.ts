import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Task} from '@app/models/task.interface';
import {TaskStatus} from '@app/enums/task-status.enum';
import {Destroyable} from '@app/components/destroyable';
import {TaskService} from '@app/services/task.service';
import {DialogService} from '@app/components/dialog/services/dialog.service';
import {AddTaskDialogComponent} from '@app/components/tasks/add-task-dialog/add-task-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent extends Destroyable implements OnInit {
  public dailyTasks$: Observable<Task[]>;

  constructor(private taskService: TaskService, private dialogService: DialogService) {
    super();
  }

  public ngOnInit(): void {
    this.dailyTasks$ = this.taskService.fetchDailyTasks();
    this.dialogService.dialogClosed$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.dailyTasks$ = this.taskService.fetchDailyTasks();
      });
  }

  public addTask(): void {
    this.dialogService.openDialog(AddTaskDialogComponent);
  }

  public completeTask(task: Task): void {
    task.status = TaskStatus.COMPLETED;
    this.dailyTasks$ = this.taskService.updateTask(task);
  }

  public rejectTask(task: Task): void {
    task.status = TaskStatus.REJECTED;
    this.dailyTasks$ = this.taskService.updateTask(task);
  }
}
