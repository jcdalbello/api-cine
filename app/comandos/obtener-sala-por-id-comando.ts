import Sala from "../dominio/sala";

export default class ObtenerSalaPorIdComando {
  constructor() {}

  public ejecutar(id: number): Sala {
    return new Sala(id, 50);
  }
}