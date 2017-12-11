export class Nacionalidad {

    public id_nacionalidad: number;
    public n_nacionalidad: string;

    constructor(
        id_nacionalidad?: number,
        n_nacionalidad?: string
    ) {
        if (id_nacionalidad) this.id_nacionalidad = id_nacionalidad;
        else this.id_nacionalidad = null;

        if (n_nacionalidad) this.n_nacionalidad = n_nacionalidad;
        else this.n_nacionalidad = null;
    }
}