import MensajesDeErrorDeSala from "./i-mensajes-de-error-de-sala";

export default class CampoIncorrectoSalaError extends Error{
  public readonly capacidad: string | undefined;

  constructor(mensajes: MensajesDeErrorDeSala) {
    super();
    this.capacidad = mensajes.capacidad;
  }
}
