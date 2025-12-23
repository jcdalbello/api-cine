interface MensajesDeErrorDePelicula {
  id?: string;
}

export default class CampoIncorrectoPeliculaError extends Error {
  public readonly id: string | undefined;

  constructor(mensajes: MensajesDeErrorDePelicula) {
    super();
    this.id = mensajes.id;
  }
}
