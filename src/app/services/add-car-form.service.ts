import {Injectable} from '@angular/core';

import {Validator} from '@app/enums/validator.enum';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AddCarFormService {

  constructor(private formBuilder: FormBuilder) {
  }

  public initForm(): FormGroup {
    return this.formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      engineSize: ['', [Validators.required, Validators.pattern(Validator.ONLY_INTEGERS)]],
      horsePower: ['', [Validators.required, Validators.pattern(Validator.ONLY_INTEGERS)]],
      productionDate: ['', [Validators.required, Validators.pattern(Validator.DATE)]],
      mileage: ['', [Validators.required, Validators.pattern(Validator.ONLY_INTEGERS)]],
      price: ['', [Validators.required, Validators.pattern(Validator.ONLY_INTEGERS)]],
      fuelType: ['', Validators.required],
    });
  }
}
