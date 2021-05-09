import {Component} from '@angular/core';
import {FileService} from '@app/components/files/services/file.service';

@Component({
  selector: 'app-files-dashboard',
  templateUrl: './files-dashboard.component.html',
  styleUrls: ['./files-dashboard.component.scss']
})
export class FilesDashboardComponent {
  public imgURL: string = null;

  constructor(private fileService: FileService) {
  }

  public handleAdditionalFilesAdded(files: File[]): void {
    if (files.length <= 0) {
      this.imgURL = null;
      return;
    }
    this.fileService.getUrlFromUploadedImage(files).then((imgUrl: string) => this.imgURL = imgUrl);
  }

  public downloadFile(): void {
    this.fileService.downloadFile(this.fileService.defaultPdf());
  }
}
