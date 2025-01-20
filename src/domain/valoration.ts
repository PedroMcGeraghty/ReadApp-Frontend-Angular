import { User } from "./user"
import { format } from 'date-fns';


export type ValorationJSON = {
    author: string,
    fotoPath:String,
    score: number,
    fecha: string,
    comentario: string
}

export class Valoration {
    constructor(
        public autor: string,
        public photoPath: String,
        public valor: number = 0,   
        public fecha: Date = new Date(1914, 14, 14),
        public comentario: string 
        
    ) { }

        static fromJson(valorationJSON: ValorationJSON): Valoration {
            return new Valoration(
                valorationJSON.author,
                valorationJSON.fotoPath,
                valorationJSON.score,
                new Date(valorationJSON.fecha),
                valorationJSON.comentario
                )
        }

    toJSON(): ValorationJSON {
        return {
            author: this.autor,
            fotoPath: this.photoPath,
            score: this.valor,
            fecha: format(this.fecha, 'dd-MM-yyyy'), 
            comentario: this.comentario
        };
    }
 
}

