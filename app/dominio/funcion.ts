import Pelicula from "./pelicula";
import Sala from "./sala";

export default class Funcion {
  constructor(
    public readonly id: number,
    public readonly sala: Sala,
    public readonly pelicula: Pelicula
  ) {}

  public obtenerId(): number {
    return this.id;
  }

  public obtenerSala(): Sala {
    return this.sala;
  }

  public obtenerPelicula(): Pelicula {
    return this.pelicula;
  }
}
