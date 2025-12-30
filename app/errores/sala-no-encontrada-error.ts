export default class SalaNoEncontradaError extends Error {
  public readonly id: string;
  
  constructor() {
    super();
    this.id = "No se encontro ninguna sala con el id indicado";
  }
}
