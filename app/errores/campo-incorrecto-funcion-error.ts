import MensajesDeErrorDeFuncion from "./i-mensajes-de-error-de-funcion";

export default class CampoIncorrectoFuncionError extends Error {
  public readonly id: string | undefined;
  public readonly idSala: string | undefined;
  public readonly idPelicula: string | undefined;
  
  constructor(mensajes: MensajesDeErrorDeFuncion) {
    super();
    this.id = mensajes.id;
    this.idSala = mensajes.idSala;
    this.idPelicula = mensajes.idPelicula;
  }
}
