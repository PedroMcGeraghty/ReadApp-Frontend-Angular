import { HttpErrorResponse } from "@angular/common/http";
import { CommonJSON, DomainObject } from "./common";


type UserBasicPivot = {
    fotoPath: string,
    nombre: string,
    apellido: string,
    alias: string,
    lenguaje: string,
    palabrasPorMinutos: number
};

export type UserBasicJSON = CommonJSON & UserBasicPivot;

export class UserBasic implements DomainObject {
    constructor(
        public id: number = -1,
        public fotoPath: string = "",
        public nombre: string = "",
        public apellido: string = "",
        public alias: string = "",
        public lenguaje: string = "",
        public palabrasPorMinutos: number = -1,
        public username:string = ""
    ) { }

    public fromJSON(userJSON: UserBasicJSON): UserBasic {
        return Object.assign(new UserBasic(), userJSON)
    }

    public toJSON(user: UserBasic): UserBasicJSON {
        return {
            id: user.id,
            fotoPath: user.fotoPath,
            nombre: user.nombre,
            apellido: user.apellido,
            alias: user.alias,
            lenguaje: user.lenguaje,
            palabrasPorMinutos: user.palabrasPorMinutos
        }
    }

}


export type UserProfilePivot = {
    fechaNacimiento: Date,
    email: string,
    perfil: Array<PerfilDeLectura>,
    tipoDeLector: string,
    amigos: Array<any>,
    librosLeidos: Array<any>,
    librosALeer: Array<any>,
    recomendacionesAValorar: Array<any>
}

export type UserProfileJSON = CommonJSON & UserBasicPivot & UserProfilePivot;

export class UserProfile implements DomainObject {
    constructor(
        public id: number = -1,
        public fotoPath: string = "",
        public nombre: string = "",
        public apellido: string = "",
        public username: string = "",
        public lenguaje: string = "",
        public palabrasPorMinutos: number = -1,
        public fechaNacimiento: Date = new Date(),
        public email: string = "",
        public perfil: Array<PerfilDeLectura> = [new PerfilDeLectura("")],
        public tipoDeLector: string = "",
        public amigos: any = "",
        public librosLeidos: any = "",
        public librosALeer: any = "",
        public recomendacionesAValorar: any = "",
        public tiempoLecturaPromedio: number = 0
    ) { }

    public fromJSON(userJSON: UserProfileJSON): UserProfile {
        return Object.assign(new UserProfile(), userJSON)
    }

    public toJSON(user: UserProfile): UserProfileJSON {
        return {
            id: user.id,
            fotoPath: user.fotoPath,
            nombre: user.nombre,
            apellido: user.apellido,
            alias: user.username,
            lenguaje: user.lenguaje,
            palabrasPorMinutos: user.palabrasPorMinutos,
            fechaNacimiento: user.fechaNacimiento,
            email: user.email,
            perfil: user.perfil,
            tipoDeLector: user.tipoDeLector,
            amigos: user.amigos,
            librosLeidos: user.librosLeidos,
            librosALeer: user.librosALeer,
            recomendacionesAValorar: user.recomendacionesAValorar
        }
    }

}

export class PerfilDeLectura {
    constructor(
        public tipoPerfil: string,
        public rangoMin?: number,
        public rangoMax?: number
    ) { }
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


//Prueba para info de usuario

export class UserInformacion {
    constructor(
        public id: number,
        public nombre?: string,
        public apellido?: string,
        public username?: string,
        public fechaNacimiento?: Date,
        public email?: string,
        public perfil?: Array<PerfilDeLectura>,
        public tipoDeLector?: string,
        public tiempoLecturaPromedio?: number) {

    }
}


export class UserProfileFriend implements DomainObject {
    constructor(
        public id: number = -1,
        public amigos: Array<UserFriend> = [],
    ) { }

    public fromJSON(userProfileFriendJSON: UserProfileFriendJSON): UserProfileFriend {

        return new UserProfileFriend(
            userProfileFriendJSON.id,
            userProfileFriendJSON.amigos.map((friendJSON) => {
                return UserFriend.prototype.fromJSON(friendJSON)
            })
        )
    }

    //ARREGLAR
    public toJSON(user: UserProfile): UserProfileJSON {
        return {
            id: user.id,
            fotoPath: user.fotoPath,
            nombre: user.nombre,
            apellido: user.apellido,
            alias: user.username,
            lenguaje: user.lenguaje,
            palabrasPorMinutos: user.palabrasPorMinutos,
            fechaNacimiento: user.fechaNacimiento,
            email: user.email,
            perfil: user.perfil,
            tipoDeLector: user.tipoDeLector,
            amigos: user.amigos,
            librosLeidos: user.librosLeidos,
            librosALeer: user.librosALeer,
            recomendacionesAValorar: user.recomendacionesAValorar
        }
    }

}

export class UserFriend implements DomainObject {
    constructor(
        public id: number = -1,
        public fotoPath: string = "",
        public nombreCompleto: string = "",
        public username: string = "",
    ) { }

    public fromJSON(userFriendJSON: UserFriendJSON): UserFriend {
        return Object.assign(new UserFriend(), userFriendJSON)
    }

    //ARREGLAR
    public toJSON(user: UserProfile): UserProfileJSON {
        return {
            id: user.id,
            fotoPath: user.fotoPath,
            nombre: user.nombre,
            apellido: user.apellido,
            alias: user.username,
            lenguaje: user.lenguaje,
            palabrasPorMinutos: user.palabrasPorMinutos,
            fechaNacimiento: user.fechaNacimiento,
            email: user.email,
            perfil: user.perfil,
            tipoDeLector: user.tipoDeLector,
            amigos: user.amigos,
            librosLeidos: user.librosLeidos,
            librosALeer: user.librosALeer,
            recomendacionesAValorar: user.recomendacionesAValorar
        }
    }

}

export type UserFriendPivot = {
    fotoPath: string,
    nombreCompleto: string,
    username: string,
}

export type UserProfileFriendPivot = {
    amigos: Array<UserFriendJSON>
}

export type UserFriendJSON = CommonJSON & UserFriendPivot;

export type UserProfileFriendJSON = CommonJSON & UserProfileFriendPivot;

export class UserAside implements DomainObject {
    constructor(
        public id: number = -1,
        public fotoPath: string = "",
        public nombreCompleto: string = "",
    ) { }

    public fromJSON(userAsideJSON: UserAsideJSON): UserAside {
        return Object.assign(new UserAside(), userAsideJSON)
    }

    //ARREGLAR
    public toJSON(user: UserProfile): UserProfileJSON {
        return {
            id: user.id,
            fotoPath: user.fotoPath,
            nombre: user.nombre,
            apellido: user.apellido,
            alias: user.username,
            lenguaje: user.lenguaje,
            palabrasPorMinutos: user.palabrasPorMinutos,
            fechaNacimiento: user.fechaNacimiento,
            email: user.email,
            perfil: user.perfil,
            tipoDeLector: user.tipoDeLector,
            amigos: user.amigos,
            librosLeidos: user.librosLeidos,
            librosALeer: user.librosALeer,
            recomendacionesAValorar: user.recomendacionesAValorar
        }
    }

}

export type UserAsidePivot = {
    fotoPath: string,
    nombreCompleto: string,
}

export type UserAsideJSON = CommonJSON & UserAsidePivot;

export class UpdateFriendsMessage {
    constructor(
    public id: string,
    public amigosAModificar: Array<string> = [],
    public agregarAmigos: boolean = false) {}
}

