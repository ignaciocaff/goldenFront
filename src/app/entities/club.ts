export class Club {
    public id_club: number;
    public nombre: string;
    public descripcion: string;

    constructor(
        id_club?: number,
        nombre?: string,
        descripcion?: string
    ) {
        if (id_club) this.id_club = id_club;
        else this.id_club = null;

        if(nombre) this.nombre  = nombre;
        else this.nombre = null;

        if (descripcion) this.descripcion = descripcion;
        else this.descripcion = null;
    }
}
