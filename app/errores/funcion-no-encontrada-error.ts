export default class FuncionNoEncontradaError extends Error {
  public readonly id: string;
  
  constructor() {
    super();
    this.id = "No se encontro ninguna funcion con el id indicado";
  }
}
