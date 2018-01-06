import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';


@Component({
    selector: 'dnd-file-upload',
    template:
    `
        <div draggable="true" ngClass="{{dndClass}}" class="dropbox">
            <div class="row">
              <div class="col-md-12 text-center" >
                <img src="content/images/icn-upload.png" /><br/>
                <a href="javascript:void(0)" (click)="file.click()" >
                  Click to browse 
                </a>
                or drag files here.
                <input type="file" 
                       #file 
                       [multiple]="multiSelect"
                       (change)="onFileChange($event)"
                       style="display:none" />
              </div>
            </div>
          </div>
          <div class="row" *ngIf="errors.length > 0">  
            <div class="alert alert-danger alert-dismissable">
                <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                <strong>Error(s):</strong><br/>
                <ul>
                    <li *ngFor="let err of errors">{{err}}</li>
                </ul>
            </div>
          </div> 
    `,
    styles: ['.error{color:#f00;}.dropbox{font-size:1.25em;padding:10px;}.drag{border:3px solid #bbb;background-color:#fff;color:#bbb;}.drop{border: 3px dashed #bbb;background-color:#efefef;color:#aaa;}']
})
export class DnDFileUploadComponent implements OnInit {

    private errors: Array<string> = new Array<string>();
    private dndClass: string = 'drag';

    // do not permit file types to be uploaded...
    @Input() private fileExt: string;
    @Input() private multiSelect = true;
    @Input() private maxSize: number = undefined;

    @Output() private onTransferFiles: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() { }


    @HostListener('dragover', ['$event']) 
    private onDragOver(event: any) {
        this.dndClass = "drop";
        event.stopPropagation();
        event.preventDefault();
    }

    @HostListener('dragenter', ['$event']) 
    private onDragEnter(event: any) {
        this.dndClass = "drop";
        event.preventDefault();
    }

    @HostListener('dragend', ['$event']) 
    private onDragEnd(event: any) {
        this.dndClass = "drag";
        event.preventDefault();
    }

    @HostListener('dragleave', ['$event']) 
    private onDragLeave(event: any) {
        this.dndClass = "drag";
        event.preventDefault();
    }
    @HostListener('drop', ['$event']) 
    private onDrop(event: any) {
        this.dndClass = "drag";
        event.preventDefault();
        let files: any = event.dataTransfer.files; // returns FileList
        this.onFileSelect(files);
    }

    private onFileChange(event: any) : void {
        let files = event.target.files;
        this.onFileSelect(files);
    }

    private onFileSelect(files: any): void {
        // validate files and allowed extensions
        if (undefined !== files && 0 < files.length && true===this.filesValid(files)) {
            this.onTransferFiles.next(files); // send file list to listeners
        }
    }

    // check to ensure files are valid for upload
    private filesValid(files: any): boolean {
        this.clearErrors(); // clear previous errors
        for (var i = 0; i < files.length; i++) {
            this.isValidFileExtension(files[i]);
        }
        return (0 === this.errors.length);
    }

    // check file extension to ensure valid
    private isValidFileExtension(file: any): boolean {
        let flag: boolean = false;
        // get file extension
        let ext : string = file.name.toUpperCase().split('.').pop() || file.name;
        // check if on exclusion list
        let exists: boolean = (-1 < this.prohibitedFileExtensions.indexOf(ext));
        if (exists) {
            this.errors.push("File type upload prohibited: " + file.name);
        } else {
            flag = true;
        }
        return flag;
    }


    private isValidFileSize(file: any): void {
        if (undefined !== this.maxSize) {
            let fileSizeinMB: number = file.size / (1024 * 1000);
            let size: number = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
            if (size > this.maxSize) {
                this.errors.push("File Size Error: " + file.name + ": file size," + size + "MB , limit of " + this.maxSize + "MB exceeded.");
            }
        }
    }

    // clear upload errors
    private clearErrors(): void {
        this.errors = new Array<string>();
    }

    // array of file extensions to exclude - can't upload!
    // values can be injected with fileExt and we also have some defaults
    private get prohibitedFileExtensions(): Array<string> {
        let badStuff: Array<string> = ["EXE", "JS", "JAR", "WAR", "VBS", "FLA", "MOV", "MP3"]; // can add more defaults if needed
        if (undefined !== this.fileExt) {
            this.fileExt.split(',').forEach(function (x) { badStuff.push(x.toLocaleUpperCase().trim()); });
        }
        return badStuff;
    }
}