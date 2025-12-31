import MensajesDeErrorDeFuncion from "./i-mensajes-de-error-de-funcion";

export default class CampoIncorrectoFuncionError extends Error {
  public readonly idSala: string | undefined;
  
  constructor(mensajes: MensajesDeErrorDeFuncion) {
    super();
    this.idSala = mensajes.idSala;
  }
}
