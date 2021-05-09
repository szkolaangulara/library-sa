import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {Car} from '@app/models/car.interface';
import {CarService} from '@app/services/car.service';
import {AddCarFormService} from '@app/services/add-car-form.service';
import {AlertService} from '@app/services/alert.service';
import {DialogService} from '@app/components/dialog/services/dialog.service';
import {AddCarFormControlName} from '@app/components/layout-manager/add-car-dialog-form/add-car-form-control-name.enum';
import {FileService} from '@app/components/files/services/file.service';

@Component({
  selector: 'app-add-car-dialog-form',
  templateUrl: './add-car-dialog-form.component.html',
  styleUrls: ['./add-car-dialog-form.component.scss']
})
export class AddCarDialogFormComponent implements OnInit {
  public form: FormGroup;
  public imgURL: string = null;
  public FormControlName: typeof AddCarFormControlName = AddCarFormControlName;

  constructor(private formService: AddCarFormService,
              private carService: CarService,
              private dialogService: DialogService,
              private alertService: AlertService,
              private fileService: FileService) {
  }

  public ngOnInit(): void {
    this.form = this.formService.initForm();
  }

  public handleAddedFile(files: File[]): void {
    if (files.length <= 0) {
      this.imgURL = null;
      return;
    }
    this.fileService.getUrlFromUploadedImage(files).then((imgUrl: string) => this.imgURL = imgUrl);
  }

  public submit(): void {
    const car: Car = {
      brand: this.form.get(AddCarFormControlName.BRAND).value,
      date: this.form.get(AddCarFormControlName.PRODUCTION_DATE).value,
      model: this.form.get(AddCarFormControlName.MODEL).value,
      photoSource: this.imgURL,
      price: this.form.get(AddCarFormControlName.PRICE).value,
    };

    this.carService.addNewCar(car);
    this.dialogService.closeDialog();
    this.alertService.success('Samochód został dodany poprawnie.');
  }

  public getFormControl(formControlName: AddCarFormControlName): FormControl {
    return this.form.get(formControlName) as FormControl;
  }

  public get isBtnDisabled(): boolean {
    return this.form.invalid || !this.imgURL;
  }
}
