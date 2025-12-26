import Pelicula from "../dominio/pelicula";
import RepositorioPelicula from "../dominio/puerto-repositorio-pelicula";

export default class AgregarPeliculaComando {
  constructor(
    private readonly repositorioPelicula: RepositorioPelicula,
  ) {}

  public async ejecutar(titulo: string, genero: string): Promise<Pelicula> {
    const peliculaSinGuardar: Pelicula = new Pelicula(0, titulo, genero);
    const peliculaGuardada: Pelicula = await this.repositorioPelicula.guardar(peliculaSinGuardar);
    return peliculaGuardada;
  }
}
