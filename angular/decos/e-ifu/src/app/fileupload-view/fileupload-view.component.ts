import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { map, EMPTY, scan, takeWhile, interval, takeLast } from 'rxjs';
import { FileMetadata, KvPair, UploadedFile } from './filemodel';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-fileupload-view',
  templateUrl: './fileupload-view.component.html',
  styleUrls: ['./fileupload-view.component.scss']
})
export class FileuploadViewComponent {
  @ViewChild("fileDropRef", { static: false }) fileDropEl!: ElementRef;
  panelOpenState = false;
  uploadedFiles: UploadedFile[] = [];
  allMetadata = new MatTableDataSource<KvPair>();
  // fileUploadApi = 'https://eifuwebapi.azurewebsites.net/pdf';
  fileUploadApi = 'http://20.12.162.108/pdf';

  constructor(private httpClient: HttpClient,
              private notifyService: NotificationService) {}

  onFileDropped($event: FileList) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler($event: Event) {
    const etarget = $event.target as HTMLInputElement;
    if(etarget.files) {
      this.prepareFilesList(etarget.files);
    }
  }

  deleteFile(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  uploadFilesSimulator(index: number) {
    this.uploadedFiles[index].progressVal = interval(80).pipe(
                map((val) => val * 10),
                // scan((a, b) => a + b),
                takeWhile((value) => value < 110, true)
    );

    this.uploadedFiles[index].progressVal.pipe(takeLast(1)).subscribe((val) => {
      this.uploadedFiles[index].deleteDisabled = false;
    });
  }

  prepareFilesList(files: FileList) {
    for (const item of Array.from(files)) {
      const uFile: UploadedFile = {
        fileName: item.name,
        fileSize: item.size,
        actualFile: item,
        progressVal: EMPTY,
        deleteDisabled: true,
        metadataPresent: false,
        metadataSource: new MatTableDataSource<KvPair>()
      }

      this.uploadedFiles.push(uFile);
    }

    if(this.fileDropEl != undefined) {
      if(files.length > 1) {
        for (let index = 0; index < files.length; index++) {
          this.uploadFilesSimulator(index);
        }
      }
      else if(files.length == 1) {
        this.uploadFilesSimulator(this.uploadedFiles.length-1);
      }
    }
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  onExpanderOpen(file: UploadedFile) {
    this.panelOpenState = true;
    this.onUpload(file);
  }

  result: FileMetadata[] = [];
  onUpload(fileP: any) {
    const formData = new FormData();
    if(fileP) {
      let thisFile = fileP as UploadedFile;
      if(!this.metadataExists(thisFile)) {
        formData.append(thisFile.fileName, thisFile.actualFile);
      }
    }
    else {
      for(let file of this.uploadedFiles) {
        if(!this.metadataExists(file)) {
          formData.append(file.fileName, file.actualFile);
        }
      }
    }

    if(formData.entries().next().done) {
      return;
    }
    console.log(formData.entries().next().done)
    this.httpClient.post<FileMetadata[]>(this.fileUploadApi, formData).subscribe({
      next: (res) => {
        this.result = res;
        console.log(res);
       },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        for(let item of this.result) {
          let existingFile = this.uploadedFiles.find(x => x.fileName == item.fileName);
          if(existingFile) {
            let tempData: KvPair[] = [];
            for(let keyI in item) {
              tempData.push({Key: keyI, Value: item[keyI as keyof FileMetadata]});
            }

            existingFile.metadataPresent = true;
            existingFile.metadataSource = new MatTableDataSource<KvPair>(tempData);
            this.notifyService.metadataChanged.next(existingFile.fileName);
          }

          //NOT WORKING
          //   this.ngZone.run(() => {
          //  });
        }
      }
    });
  }

  metadataExists(file: UploadedFile): boolean {
    if(file.metadataPresent && file.metadataSource.data.length > 0) {
      return true;
    }
    return false;
  }

  /** Return distinct message for sent, upload progress, & response events */
  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;

      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = event.total ? Math.round(100 * event.loaded / event.total) : 0;
        return `File "${file.name}" is ${percentDone}% uploaded.`;

      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;

      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }

  private showProgress(msg: any) {
    console.log(msg);
  }
}
