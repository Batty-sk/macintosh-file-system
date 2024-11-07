import { FileTypeImg } from "./constants";

export const fileTypeImgFinder= (fileName:string)=>{
    const extension = fileName.split('/').pop();
    switch(extension){
        case('txt'):
            return FileTypeImg['txt'];
        case('jpg'):
            return FileTypeImg['jpg']
        case('png'):
            return FileTypeImg['png']
        case('pdf'):
            return FileTypeImg['pdf']
        default:
            return FileTypeImg['random'];
    }

}