import {Injectable} from '@angular/core';

import {Validator} from '@app/enums/validator.enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddCarFormControlName} from '@app/components/layout-manager/add-car-dialog-form/add-car-form-control-name.enum';

@Injectable({
  providedIn: 'root'
})
export class AddCarFormService {

  constructor(private formBuilder: FormBuilder) {
  }

  public initForm(): FormGroup {
    return this.formBuilder.group({
      [AddCarFormControlName.BRAND]: ['', Validators.required],
      [AddCarFormControlName.MODEL]: ['', Validators.required],
      [AddCarFormControlName.PRODUCTION_DATE]: ['', [Validators.required, Validators.pattern(Validator.DATE)]],
      [AddCarFormControlName.PRICE]: ['', [Validators.required, Validators.pattern(Validator.ONLY_INTEGERS)]],
      [AddCarFormControlName.PRICE_PER_DAY]: ['', [Validators.required, Validators.pattern(Validator.ONLY_INTEGERS)]],
    });
  }
}
