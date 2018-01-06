import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { RecordModel, FileModel } from '../models/file.model'
import { ConfirmModalMessageModel } from '../models/confirm-modal-message.model'

import { FileUploadService } from '../services/file-upload.service'

@Component({
    selector: 'file-list',
    templateUrl: './file-list.html'
})

export class FileListComponent {


    private sendDocDeleteMessage: Subject<ConfirmModalMessageModel> = new Subject<ConfirmModalMessageModel>();

    private record: RecordModel = new RecordModel();

    private uploadFiles: Array<any> = new Array<any>();

    constructor(private fileService: FileUploadService) {

    }

    ngOnInit() {

    }

    


    private download(id: number): boolean {
   //     this.api.downloadDocument(id);
        return false;
    }

    private delete(f: FileModel, index: number): void {
        if (undefined !== f) {
            let m: ConfirmModalMessageModel = new ConfirmModalMessageModel();
            m.modalMessage = 'Are you sure you want to delete "' + f.fileName + '"?';
            m.modalTitle = "Confirm Document Delete"
            m.recordId = index;
            // send the message to the modal
            this.sendDocDeleteMessage.next(m);
        }
    }

    private onSubmit(frm: NgForm) : void {

        if (frm.valid){
            this.fileService.saveRecordAndFiles(this.record.id, this.record, this.uploadFiles)
            .subscribe();
            
        }


    }

    private responseConfirmed(msg: ConfirmModalMessageModel): void {
        if (true === msg.responseValue) {
            this.record.queuedFiles = this.record.queuedFiles.filter((v, i) => {
                return (i !== msg.recordId);
            });
        }
    }

    private queueFiles(event: any) {
        if (undefined === this.record.queuedFiles) {
            this.record.queuedFiles = new Array<any>();
        }

        for (let i = 0; i < event.length; i++) {
            let d: FileModel = new FileModel();
            d.id = 0;
            d.fileName = event[i].name;
            d.recordId = this.record.id;

            this.record.queuedFiles.push(d);
        }
        this.uploadFiles.push(event);
    }
}