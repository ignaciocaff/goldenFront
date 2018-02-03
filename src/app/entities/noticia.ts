import { Torneo, Club, CategoriaNoticia } from './index';

export class Noticia {
    public id_noticia: number;
    public titulo: string;
    public descripcion: string;
    public fecha: Date;
    public torneo: Torneo;
    public club: Club;
    public categoriaNoticia: CategoriaNoticia;
    public tags: string;
    public id_thumbnail: number;

    constructor(
        id_noticia?: number,
        titulo?: string,
        descripcion?: string,
        fecha?: Date,
        torneo?: Torneo,
        club?: Club,
        categoriaNoticia?: CategoriaNoticia,
        tags?: string,
        id_thumbnail?: number
    ) {
        if (id_noticia) {
            this.id_noticia = id_noticia;
        } else {
            this.id_noticia = null;
        }

        if (titulo) {
            this.titulo = titulo;
        } else {
            this.titulo = null;
        }

        if (descripcion) {
            this.descripcion = descripcion;
        } else {
            this.descripcion = null;
        }

        if (fecha) {
            this.fecha = fecha;
        } else {
            this.fecha = null;
        }

        if (torneo) {
            this.torneo = torneo;
        } else {
            this.torneo = new Torneo();
        }

        if (club) {
            this.club = club;
        } else {
            this.club = new Club();
        }

        if (categoriaNoticia) {
            this.categoriaNoticia = categoriaNoticia;
        } else {
            this.categoriaNoticia = new CategoriaNoticia();
        }

        if (tags) {
            this.tags = tags;
        } else {
            this.tags = null;
        }

        if (id_thumbnail) {
            this.id_thumbnail = id_thumbnail;
        } else {
            this.id_thumbnail = null;
        }
    }
}
