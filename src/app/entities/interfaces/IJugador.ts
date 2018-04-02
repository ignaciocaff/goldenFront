export class IJugador {
    nombre: string;
    apellido: string;
    id_persona: number;
    id_equipo: number;
    imagePath: string;
    rol: String;
    nro_doc: number;
  
    constructor(
      nombre?: string,
      apellido?: string,
      id_persona?: number,
      id_equipo?: number,
      imagePath?: string,
      rol?: String,
      nro_doc?: number
    ) {
      if (nombre) this.nombre = nombre;
      else this.nombre = null;
  
      if (apellido) this.apellido = apellido;
      else this.apellido = null;
  
      if (id_persona) this.id_persona = id_persona;
      else this.id_persona = null;
  
      if (id_equipo) this.id_equipo = id_equipo;
      else this.id_equipo = null;
  
      if (imagePath) this.imagePath = imagePath;
      else this.imagePath = null;
  
      if (rol) this.rol = rol;
      else this.rol = null;
  
      if (nro_doc) this.nro_doc = nro_doc;
      else this.nro_doc = null;
    }
  }