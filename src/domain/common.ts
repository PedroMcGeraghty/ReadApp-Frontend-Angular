export interface DomainObject{

    id:number

    fromJSON(JSON:CommonJSON): DomainObject

    toJSON(object:DomainObject): CommonJSON
}

// Todos los tipos tienen un id
export type CommonJSON = {
    id: number;
};