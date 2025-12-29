import Sala from "../dominio/sala";

export default class AgregarSalaComando {
  constructor() {}

  public ejecutar(capacidad: number): Sala {
    if (capacidad === 50) {
      const sala: Sala = new Sala(1, capacidad);
      return sala;
    } else {
      const sala: Sala = new Sala(2, capacidad);
      return sala;
    }
  }
}