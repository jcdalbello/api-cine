import MensajesDeErrorDePelicula from "./i-mensajes-de-error-de-pelicula";

export default class CampoIncorrectoPeliculaError extends Error {
  public readonly id: string | undefined;
  public readonly titulo: string | undefined;
  public readonly genero: string | undefined;


  constructor(mensajes: MensajesDeErrorDePelicula) {
    super();
    this.id = mensajes.id;
    this.titulo = mensajes.titulo;
    this.genero = mensajes.genero;
  }
}
