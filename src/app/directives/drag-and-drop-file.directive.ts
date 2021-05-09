import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';

import {FileService} from '@app/components/files/services/file.service';
import {FileContentType} from '@app/enums/file-content-type.enum';

@Directive({
  selector: '[appDragAndDropFile]',
})
export class DragAndDropFileDirective {
  @Input()
  public allowedFileTypes: FileContentType[] = [FileContentType.JPG, FileContentType.PNG, FileContentType.JPEG];
  @Input()
  public allowMultipleFiles: boolean;
  @Input()
  public maxFilesAmount: number = 20;
  @Input()
  public maxFileMBSize: number = 20;
  @Output()
  public fileDropped: EventEmitter<File[]> = new EventEmitter<File[]>();
  private isFileDropped: boolean = false;

  constructor(private fileService: FileService) {
  }

  @HostBinding('style.background')
  public bgColor: string;

  @HostListener('dragover', ['$event'])
  public onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.bgColor = '#000000';
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.isFileDropped) {
      this.bgColor = 'transparent';
    }
  }

  @HostListener('drop', ['$event'])
  public onDragDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const files: FileList = event.dataTransfer.files;
    if (files.length > 0) {
      const allowedFiles: File[] = this.fileService.handleFilesAddition(files, this.allowedFileTypes, this.maxFilesAmount, this.allowMultipleFiles, this.maxFileMBSize);
      this.fileDropped.emit(allowedFiles);
      return;
    }

    this.bgColor = 'transparent';
  }

  @HostListener('mouseover', ['$event'])
  public onMouseOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.bgColor = '#000000';
  }

  @HostListener('mouseleave', ['$event'])
  public onMouseLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.isFileDropped) {
      this.bgColor = 'transparent';
    }
  }
}

