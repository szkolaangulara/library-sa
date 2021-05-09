import {Component, OnInit} from '@angular/core';

import {AbstractInput} from '@app/components/form/abstract-input';
import {isFormControlInvalid} from '@app/helpers/form.helper';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent extends AbstractInput implements OnInit {

  public ngOnInit(): void {
    this.inputId = `form-control-${InputComponent.instanceCounter}`;
    InputComponent.instanceCounter++;
  }

  public isFormControlInvalid(): boolean {
    return isFormControlInvalid(this.parentFormControl);
  }

}
