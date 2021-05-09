import {Component, OnInit} from '@angular/core';
import {AddTaskFormService} from '@app/components/tasks/services/add-task-form.service';
import {FormControl, FormGroup} from '@angular/forms';
import {AddTaskFormControlName} from '@app/components/tasks/add-task-dialog/add-task-form-control-name.enum';
import {TaskService} from '@app/services/task.service';
import {Task} from '@app/models/task.interface';
import {DialogService} from '@app/components/dialog/services/dialog.service';
import {TaskStatus} from '@app/enums/task-status.enum';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent implements OnInit {
  public form: FormGroup;
  public FormControlName: typeof AddTaskFormControlName = AddTaskFormControlName;

  constructor(private formService: AddTaskFormService,
              private taskService: TaskService,
              private dialogService: DialogService) {
  }

  public ngOnInit(): void {
    this.form = this.formService.initForm();
  }

  public getFormControl(formControlName: AddTaskFormControlName): FormControl {
    return this.form.get(formControlName) as FormControl;
  }

  public get isBtnDisabled(): boolean {
    return this.form.invalid;
  }

  public addNewTask(): void {
    const task: Task = {
      name: this.form.get(AddTaskFormControlName.NAME).value,
      description: this.form.get(AddTaskFormControlName.DESCRIPTION).value,
      status: TaskStatus.NEW,
    };

    this.taskService.addNewTask(task);
    this.dialogService.closeDialog();
  }
}
