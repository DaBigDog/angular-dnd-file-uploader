"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var DnDFileUploadComponent = (function () {
    function DnDFileUploadComponent() {
        this.errors = new Array();
        this.dndClass = 'drag';
        this.multiSelect = true;
        this.maxSize = undefined;
        this.onTransferFiles = new core_1.EventEmitter();
    }
    DnDFileUploadComponent.prototype.ngOnInit = function () { };
    DnDFileUploadComponent.prototype.onDragOver = function (event) {
        this.dndClass = "drop";
        event.stopPropagation();
        event.preventDefault();
    };
    DnDFileUploadComponent.prototype.onDragEnter = function (event) {
        this.dndClass = "drop";
        event.preventDefault();
    };
    DnDFileUploadComponent.prototype.onDragEnd = function (event) {
        this.dndClass = "drag";
        event.preventDefault();
    };
    DnDFileUploadComponent.prototype.onDragLeave = function (event) {
        this.dndClass = "drag";
        event.preventDefault();
    };
    DnDFileUploadComponent.prototype.onDrop = function (event) {
        this.dndClass = "drag";
        event.preventDefault();
        var files = event.dataTransfer.files; // returns FileList
        this.onFileSelect(files);
    };
    DnDFileUploadComponent.prototype.onFileChange = function (event) {
        var files = event.target.files;
        this.onFileSelect(files);
    };
    DnDFileUploadComponent.prototype.onFileSelect = function (files) {
        // validate files and allowed extensions
        if (undefined !== files && 0 < files.length && true === this.filesValid(files)) {
            this.onTransferFiles.next(files); // send file list to listeners
        }
    };
    // check to ensure files are valid for upload
    DnDFileUploadComponent.prototype.filesValid = function (files) {
        this.clearErrors(); // clear previous errors
        for (var i = 0; i < files.length; i++) {
            this.isValidFileExtension(files[i]);
        }
        return (0 === this.errors.length);
    };
    // check file extension to ensure valid
    DnDFileUploadComponent.prototype.isValidFileExtension = function (file) {
        var flag = false;
        // get file extension
        var ext = file.name.toUpperCase().split('.').pop() || file.name;
        // check if on exclusion list
        var exists = (-1 < this.prohibitedFileExtensions.indexOf(ext));
        if (exists) {
            this.errors.push("File type upload prohibited: " + file.name);
        }
        else {
            flag = true;
        }
        return flag;
    };
    DnDFileUploadComponent.prototype.isValidFileSize = function (file) {
        if (undefined !== this.maxSize) {
            var fileSizeinMB = file.size / (1024 * 1000);
            var size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
            if (size > this.maxSize) {
                this.errors.push("File Size Error: " + file.name + ": file size," + size + "MB , limit of " + this.maxSize + "MB exceeded.");
            }
        }
    };
    // clear upload errors
    DnDFileUploadComponent.prototype.clearErrors = function () {
        this.errors = new Array();
    };
    Object.defineProperty(DnDFileUploadComponent.prototype, "prohibitedFileExtensions", {
        // array of file extensions to exclude - can't upload!
        // values can be injected with fileExt and we also have some defaults
        get: function () {
            var badStuff = ["EXE", "JS", "JAR", "WAR", "VBS", "FLA", "MOV", "MP3"]; // can add more defaults if needed
            if (undefined !== this.fileExt) {
                this.fileExt.split(',').forEach(function (x) { badStuff.push(x.toLocaleUpperCase().trim()); });
            }
            return badStuff;
        },
        enumerable: true,
        configurable: true
    });
    return DnDFileUploadComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DnDFileUploadComponent.prototype, "fileExt", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DnDFileUploadComponent.prototype, "multiSelect", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DnDFileUploadComponent.prototype, "maxSize", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DnDFileUploadComponent.prototype, "onTransferFiles", void 0);
__decorate([
    core_1.HostListener('dragover', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DnDFileUploadComponent.prototype, "onDragOver", null);
__decorate([
    core_1.HostListener('dragenter', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DnDFileUploadComponent.prototype, "onDragEnter", null);
__decorate([
    core_1.HostListener('dragend', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DnDFileUploadComponent.prototype, "onDragEnd", null);
__decorate([
    core_1.HostListener('dragleave', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DnDFileUploadComponent.prototype, "onDragLeave", null);
__decorate([
    core_1.HostListener('drop', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DnDFileUploadComponent.prototype, "onDrop", null);
DnDFileUploadComponent = __decorate([
    core_1.Component({
        selector: 'dnd-file-upload',
        template: "\n        <div draggable=\"true\" ngClass=\"{{dndClass}}\" class=\"dropbox\">\n            <div class=\"row\">\n              <div class=\"col-md-12 text-center\" >\n                <img src=\"content/images/icn-upload.png\" /><br/>\n                <a href=\"javascript:void(0)\" (click)=\"file.click()\" >\n                  Click to browse \n                </a>\n                or drag files here.\n                <input type=\"file\" \n                       #file \n                       [multiple]=\"multiSelect\"\n                       (change)=\"onFileChange($event)\"\n                       style=\"display:none\" />\n              </div>\n            </div>\n          </div>\n          <div class=\"row\" *ngIf=\"errors.length > 0\">  \n            <div class=\"alert alert-danger alert-dismissable\">\n                <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\n                <strong>Error(s):</strong><br/>\n                <ul>\n                    <li *ngFor=\"let err of errors\">{{err}}</li>\n                </ul>\n            </div>\n          </div> \n    ",
        styles: ['.error{color:#f00;}.dropbox{font-size:1.25em;padding:10px;}.drag{border:3px solid #bbb;background-color:#fff;color:#bbb;}.drop{border: 3px dashed #bbb;background-color:#efefef;color:#aaa;}']
    }),
    __metadata("design:paramtypes", [])
], DnDFileUploadComponent);
exports.DnDFileUploadComponent = DnDFileUploadComponent;
//# sourceMappingURL=dnd-file-upload.component.js.map