import { Book } from "../domain/book";

export const BOOKS = [
    new Book(
        0,
        "En las Montañas de la Locura",
        'H.P. Lovecraft',
        100000,  // words
        220,     // pages
        ["English", "Spanish", "French"],  // translations
        1500,     // weekly sells
         "https://i.pinimg.com/originals/ab/ec/d5/abecd51b79366c089872d1e88e6c7424.jpg"
    ),
    
    new Book(
        1,
        "La Llamada de Cthulhu",
        'H.P. Lovecraft',
        45000,   // words
        140,     // pages
        ["English", "German", "Italian"],  // translations
        2100,     // weekly sells
        "https://images.cdn1.buscalibre.com/fit-in/360x360/9f/67/9f672c2b0920c001252d8446a88ce260.jpg"
    ),
    
    new Book(
        2,
        "El Color que Cayó del Cielo",
        'H.P. Lovecraft',
        37000,   // words
        98,      // pages
        ["English", "Portuguese", "Russian"],  // translations
        1200,     // weekly sells
        "https://cdn.kobo.com/book-images/Images/a446b9b8-6f54-4edd-b1de-450d04abaa18/300/300/False/image.jpg"
    ),
    
    new Book(
        3,
        "La Sombra sobre Innsmouth",
        'H.P. Lovecraft',
        52000,   // words
        170,     // pages
        ["English", "Spanish", "Dutch"],  // translations
        1800,     // weekly sells
        "https://image.tmdb.org/t/p/original/grEVYkBAVIzQ4JmZ7ydceN9DFQR.jpg"
    ),
]