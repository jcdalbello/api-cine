interface MensajesDeErrorDePelicula {
  id?: string;
  titulo?: string;
}

export default class CampoIncorrectoPeliculaError extends Error {
  public readonly id: string | undefined;
  public readonly titulo: string | undefined;

  constructor(mensajes: MensajesDeErrorDePelicula) {
    super();
    this.id = mensajes.id;
    this.titulo = mensajes.titulo;
  }
}
