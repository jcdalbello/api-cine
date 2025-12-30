export default class SalaNoEncontradaError extends Error {
  public readonly id: string;
  
  constructor() {
    super();
    this.id = "La sala solicitada no se ha encontrado";
  }
}
