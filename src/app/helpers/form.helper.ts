import {FormControl, FormGroup} from '@angular/forms';

export function isFormControlInvalidFromFormGroup(form: FormGroup, formControlName: string): boolean {
  if (!form || !formControlName) {
    return true;
  }

  return form.get(formControlName).touched && form.get(formControlName).errors && form.get(formControlName).invalid;
}

export function isFormControlInvalid(formControl: FormControl): boolean {
  if (!formControl) {
    return true;
  }

  return formControl.touched && formControl.errors && formControl.invalid;
}

