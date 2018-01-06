import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { FileListComponent }  from './file-upload-components/file-list.component';
import { DnDFileUploadComponent }  from './file-upload-components/dnd-file-upload.component';
import { ConfirmModal } from './confirm-modal/confirm-modal.component'

import { FileUploadService } from './services/file-upload.service'


@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule],
  declarations: [ AppComponent, FileListComponent, DnDFileUploadComponent, ConfirmModal ],
  providers:    [ FileUploadService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
