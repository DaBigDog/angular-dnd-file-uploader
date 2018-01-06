
export class RecordModel {

    public id: number = 0;
    public name: string;
    public queuedFiles: Array<FileModel> = new Array<FileModel>();


}


export class FileModel {

    public id: number = 0;
    public recordId: number = 0;
    public fileName: string;
    public comments: string;

}