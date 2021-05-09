import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {isFormControlInvalid} from '@app/helpers/form.helper';
import {AbstractInput} from '@app/components/form/abstract-input';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent extends AbstractInput implements OnInit {

  public ngOnInit(): void {
    this.inputId = `form-control-${TextAreaComponent.instanceCounter}`;
    TextAreaComponent.instanceCounter++;
  }

  public isFormControlInvalid(): boolean {
    return isFormControlInvalid(this.parentFormControl);
  }

}
