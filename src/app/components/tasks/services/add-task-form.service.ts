import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddTaskFormControlName} from '@app/components/tasks/add-task-dialog/add-task-form-control-name.enum';

@Injectable({
  providedIn: 'root'
})
export class AddTaskFormService {

  constructor(private formBuilder: FormBuilder) {
  }

  public initForm(): FormGroup {
    return this.formBuilder.group({
      [AddTaskFormControlName.NAME]: ['', Validators.required],
      [AddTaskFormControlName.DESCRIPTION]: ['', Validators.required],
    });
  }
}
