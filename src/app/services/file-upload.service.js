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
var Observable_1 = require("rxjs/Observable");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var FileUploadService = (function () {
    function FileUploadService(http) {
        this.http = http;
    }
    FileUploadService.prototype.saveRecordAndFiles = function (id, record, fileListArray) {
        var formData = new FormData();
        // roll the file info into the form data and add the view model
        if (undefined !== fileListArray && 0 < fileListArray.length) {
            fileListArray.forEach(function (item) {
                for (var i = 0; i < item.length; i++) {
                    formData.append("file[]", item[i], item[i].name);
                }
            });
        }
        formData.append('viewModel', JSON.stringify(record));
        var headers = new http_1.Headers();
        /** No need to include Content-Type in Angular 4 */
        //headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        var route = "api/fileupload";
        if (undefined !== id && 0 < id) {
            route += "/" + id.toString();
        }
        return this.http.post(route, formData, options)
            .map(function (response) { return response.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    return FileUploadService;
}());
FileUploadService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FileUploadService);
exports.FileUploadService = FileUploadService;
//# sourceMappingURL=file-upload.service.js.map