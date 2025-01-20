//libro devuelta por el backend
export type BookJSON = {

    autor: string; // me qedo con los datos qe me interesan de autor(nombre/apellido/id)
    cantidadPalabras: number;
    cantidadPaginas: number;
    ventasSemanales: number;
    traducciones: Array<string>;
    titulo: string;
    id: number,
    imagen: string;
};

export class Book {
    constructor(
        public id: number = 0,
        public title: string = '',
        public author: string = '',
        public words: number = 0,
        public pages: number = 0,
        public translations: Array<string> = [],
        public weeklySells: number = 0,
        public imagen: string = ''
    ) { }

    // Convertir de JSON a Book
    static fromJson(bookJSON: BookJSON): Book {
        return new Book(
            bookJSON.id,
            bookJSON.titulo,
            bookJSON.autor,
            bookJSON.cantidadPalabras,
            bookJSON.cantidadPaginas,
            bookJSON.traducciones,
            bookJSON.ventasSemanales,
            bookJSON.imagen
        );
    }

    toJSON(): BookJSON {
        return {
            id: this.id,
            titulo: this.title,
            autor: this.author,
            cantidadPalabras: this.words,
            cantidadPaginas: this.pages,
            traducciones: this.translations,
            ventasSemanales: this.weeklySells,
            imagen: this.imagen
        }
    }
}

