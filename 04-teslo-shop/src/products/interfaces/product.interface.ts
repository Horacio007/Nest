import { IGender } from "src/gender/interfaces/gender.interface";
import { ISize } from "src/sizes/interfaces/size.interface";

export interface IProduct {
    genderId:string;
    title:string;
    price?:number;
    description?:string;
    slug?:string;
    stock?:number;
    sizes?: ISize[];
    gender:IGender;
}