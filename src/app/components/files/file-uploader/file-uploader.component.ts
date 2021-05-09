import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileService} from '@app/components/files/services/file.service';
import {AlertService} from '@app/services/alert.service';
import {FileContentType} from '@app/enums/file-content-type.enum';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  private static instanceCounter: number = 0;

  @Input()
  public allowedFileTypes: FileContentType[] = [FileContentType.JPG, FileContentType.PNG, FileContentType.JPEG];
  @Input()
  public header: string;
  @Input()
  public allowMultipleFiles: boolean = false;
  @Input()
  public maxFilesAmount: number = 20;
  @Input()
  public maxFileMBSize: number = 20;
  @Output()
  public filesAdded: EventEmitter<File[]> = new EventEmitter<File[]>();
  public files: File[] = [];
  public fileInputId: string;

  constructor(private fileService: FileService, private alertService: AlertService) {
  }

  public ngOnInit(): void {
    this.fileInputId = `file-input-${FileUploaderComponent.instanceCounter}`;
    FileUploaderComponent.instanceCounter++;
  }

  public fileDropped(fileList: File[]): void {
    if (!fileList) {
      return;
    }

    const totalFilesAmount: number = fileList.length + this.files.length;
    if (totalFilesAmount > 20) {
      this.alertService.error(`Próbujesz dodać więcej niż ${this.maxFilesAmount} plików.`);
      return;
    }

    if (!this.allowMultipleFiles) {
      this.files = [];
    }

    fileList.forEach((file: File) => this.files.push(file));
    this.filesAdded.emit(this.files);
  }

  public removeFile(file: File): void {
    this.files.splice(this.files.indexOf(file), 1);
    this.filesAdded.emit(this.files);
  }

  public handleFileChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    const files: FileList = element.files;

    if (!files) {
      return;
    }

    const totalFilesAmount: number = files.length + this.files.length;
    if (totalFilesAmount > 20) {
      this.alertService.error(`Próbujesz dodać więcej niż ${this.maxFilesAmount} plików.`);
      return;
    }

    const allowedFiles: File[] = this.fileService.handleFilesAddition(files, this.allowedFileTypes, this.maxFilesAmount, this.allowMultipleFiles, this.maxFileMBSize);

    if (!this.allowMultipleFiles) {
      this.files = [];
    }
    if (!allowedFiles) {
      return;
    }
    allowedFiles.forEach((file: File) => this.files.push(file));
    this.filesAdded.emit(this.files);
    element.value = null;
  }
}
