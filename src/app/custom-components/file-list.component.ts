import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';


@Component({
    selector: 'file-list',
    templateUrl: './app/custom-components/file-list.html'
})

export class FileListComponent {


    private sendDocDeleteMessage: Subject<ConfirmModalMessageModel> = new Subject<ConfirmModalMessageModel>();

    private documents: Array<DocumentModel> = Array<DocumentModel>();

    constructor(private api: TestCaseApiService) {

    }

    ngOnInit() {

    }

    


    private download(id: number): boolean {
        this.api.downloadDocument(id);
        return false;
    }

    private delete(doc: DocumentModel, index: number): void {
        if (undefined !== doc) {
            let m: ConfirmModalMessageModel = new ConfirmModalMessageModel();
            m.modalMessage = 'Are you sure you want to delete "' + doc.FileName + '"?';
            m.modalTitle = "Confirm Document Delete"
            m.recordId = index;
            // send the message to the modal
            this.sendDocDeleteMessage.next(m);
        }
    }

    private responseConfirmed(msg: ConfirmModalMessageModel): void {
        if (true === msg.responseValue) {
            this.documents = this.documents.filter((v, i) => {
                return (i !== msg.recordId);
            });
        }
    }

    private queueFiles(event: any) {

        for (let i = 0; i < event.length; i++) {
            let d: DocumentModel = new DocumentModel();
            d.ID = 0;
            d.FileName = event[i].name;
            d.TestCaseID = this.testCaseRecord.ID;
            // add a unique id to the document and file list item so
            // when they're uploaded we cancompare and only upload docs in Documents array
            let g: string = Guid.newGuid();
            d.uniqueID = g;
            event[i].uniqueId = g;

            this.documents.push(d);
        }

        if (undefined === this.testCaseRecord.queuedFileList) {
            this.testCaseRecord.queuedFileList = new Array<any>();
        }

        this.testCaseRecord.queuedFileList.push(event);
    }
}