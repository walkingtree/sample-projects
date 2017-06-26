import { Component } from '@angular/core';
import { AppLitteralsConfig } from 'providers/litterals/app-litterals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public uploadedFiles: Array<any> = [];

  public AppLitteralsConfig: any = AppLitteralsConfig;

  constructor() {

  }

  /**
   * Method to handle file stack upload complete
   * @param files  file stack uploaded data 
   */
  onFileStackUploadComplete(files) {
    this.uploadedFiles = [];
    if (files.success) {
      files.data.forEach((data) => {
        this.uploadedFiles.push(data);
      });
    }
  }
}
