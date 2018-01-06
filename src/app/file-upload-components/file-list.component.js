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
var Subject_1 = require("rxjs/Subject");
var file_model_1 = require("../models/file.model");
var confirm_modal_message_model_1 = require("../models/confirm-modal-message.model");
var file_upload_service_1 = require("../services/file-upload.service");
var FileListComponent = (function () {
    function FileListComponent(fileService) {
        this.fileService = fileService;
        this.sendDocDeleteMessage = new Subject_1.Subject();
        this.record = new file_model_1.RecordModel();
        this.uploadFiles = new Array();
    }
    FileListComponent.prototype.ngOnInit = function () {
    };
    FileListComponent.prototype.download = function (id) {
        //     this.api.downloadDocument(id);
        return false;
    };
    FileListComponent.prototype.delete = function (f, index) {
        if (undefined !== f) {
            var m = new confirm_modal_message_model_1.ConfirmModalMessageModel();
            m.modalMessage = 'Are you sure you want to delete "' + f.fileName + '"?';
            m.modalTitle = "Confirm Document Delete";
            m.recordId = index;
            // send the message to the modal
            this.sendDocDeleteMessage.next(m);
        }
    };
    FileListComponent.prototype.onSubmit = function (frm) {
        if (frm.valid) {
            this.fileService.saveRecordAndFiles(this.record.id, this.record, this.uploadFiles)
                .subscribe();
        }
    };
    FileListComponent.prototype.responseConfirmed = function (msg) {
        if (true === msg.responseValue) {
            this.record.queuedFiles = this.record.queuedFiles.filter(function (v, i) {
                return (i !== msg.recordId);
            });
        }
    };
    FileListComponent.prototype.queueFiles = function (event) {
        if (undefined === this.record.queuedFiles) {
            this.record.queuedFiles = new Array();
        }
        for (var i = 0; i < event.length; i++) {
            var d = new file_model_1.FileModel();
            d.id = 0;
            d.fileName = event[i].name;
            d.recordId = this.record.id;
            this.record.queuedFiles.push(d);
        }
        this.uploadFiles.push(event);
    };
    return FileListComponent;
}());
FileListComponent = __decorate([
    core_1.Component({
        selector: 'file-list',
        templateUrl: './file-list.html'
    }),
    __metadata("design:paramtypes", [file_upload_service_1.FileUploadService])
], FileListComponent);
exports.FileListComponent = FileListComponent;
//# sourceMappingURL=file-list.component.js.map