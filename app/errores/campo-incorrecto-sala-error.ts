import MensajesDeErrorDeSala from "./i-mensajes-de-error-de-sala";

export default class CampoIncorrectoSalaError extends Error{
  public readonly id: string | undefined;
  public readonly capacidad: string | undefined;

  constructor(mensajes: MensajesDeErrorDeSala) {
    super();
    this.id = mensajes.id;
    this.capacidad = mensajes.capacidad;
  }
}
