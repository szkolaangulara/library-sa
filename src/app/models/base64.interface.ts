import {FileContentType} from '@app/enums/file-content-type.enum';

export interface Base64 {
    fileName: string;
    contentType: FileContentType;
    base64: string;
}
