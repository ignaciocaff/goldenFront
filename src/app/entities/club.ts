export class Club {
    public descripcion: string;
    public id_club: number;
    public nombre: string;

    constructor(
        descripcion?: string,
        id_club?: number,
        nombre?: string
    ) {
        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;

        if (id_club) this.id_club = id_club;
        else this.id_club = null;

        if(nombre) this.nombre  = nombre;
        else this.nombre = null;
    }
}