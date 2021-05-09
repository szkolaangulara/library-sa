import {Input} from '@angular/core';
import {FormControl} from '@angular/forms';

export class AbstractInput {
  protected static instanceCounter: number = 0;
  @Input()
  public parentFormControl: FormControl;
  @Input()
  public label: string;
  @Input()
  public placeholder: string = '';
  @Input()
  public mask: string;
  @Input()
  public requiredErrorText: string = 'Pole wymagane';
  @Input()
  public minLengthErrorText: string = 'Podana wartość jest za krótka';
  @Input()
  public maxLengthErrorText: string = 'Podana wartość jest za długa';
  @Input()
  public patternErrorText: string = 'Podana wartość nie spełnia wymaganego wzorca';
  @Input()
  public dropSpecialCharacters: boolean = false;
  @Input()
  public specialCharacters: string[];
  public inputId: string;
}
