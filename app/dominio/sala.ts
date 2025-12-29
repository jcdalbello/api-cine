export default class Sala {
  private id: number;
  private capacidad: number;

  constructor(id: number, capacidad: number) {
    this.id = id;
    this.capacidad = capacidad;
  }

  public obtenerId(): number {
    return this.id;
  }

  public obtenerCapacidad(): number {
    return this.capacidad;
  }
}