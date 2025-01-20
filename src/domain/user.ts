export type UserJSON = {
    fotoPath: string,
    nombre: string,
    apellido: string,
    alias: string,
    fechaNacimiento: Date,
    palabrasPorMinutos: number,
    direccionMail: string,
    lenguaje: string,
    id: number,
    tipoDeLector: Map<any, any>,
    perfil: Map<any, any>,
    listaObservers: Array<any>,
    autoresPreferidos: Array<any>,
    librosLeidos: Array<any>,
    cantidadVecesLeido: Array<any>,
    librosALeer: Array<any>,
    amigos: Array<any>,
    recomendaciones: Array<any>,
    recomendacionesAValorar: Array<any>,
    recomendacionesValoradas: Map<any, any>
}
 
 
export class User {
    constructor(
        public photo: string = "",
        public name: string = "",
        public lastName: string = "",
        public alias: string = "",
        public birthDate: Date = new Date(),
        public readVelocity: number = -1,
        public email: string = "",
        public language: string = "",
        public id: number = -1
    ) { }
 
    static fromJson(userJSON: UserJSON): User {
        return new User(
            userJSON.fotoPath,
            userJSON.nombre,
            userJSON.apellido,
            userJSON.alias,
            userJSON.fechaNacimiento,
            userJSON.palabrasPorMinutos,
            userJSON.direccionMail,
            userJSON.lenguaje,
            userJSON.id
        )
    }
 
}
 
enum Language {
    INGLES,
    ESPANIOL,
    ALEMAN,
    ITALIANO,
    PORTUGUES,
    MANDARIN,
    ARABE,
    RUSO,
    HINDI,
    FRANCES,
    BENGALI,
    JAPONES,
}
