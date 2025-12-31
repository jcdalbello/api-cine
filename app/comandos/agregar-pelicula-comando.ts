import RepositorioPelicula from "../dominio/puerto-repositorio-pelicula";
import CreacionPeliculaDTO from "../dtos/creacion-pelicula-dto";
import Pelicula from "../dominio/pelicula";

export default class AgregarPeliculaComando {
  constructor(
    private readonly repositorioPelicula: RepositorioPelicula,
  ) {}

  public async ejecutar(creacionPeliculaDTO: CreacionPeliculaDTO): Promise<Pelicula> {
    const peliculaSinGuardar: Pelicula = new Pelicula(0, creacionPeliculaDTO.titulo, creacionPeliculaDTO.genero);
    const peliculaGuardada: Pelicula = await this.repositorioPelicula.guardar(peliculaSinGuardar);
    return peliculaGuardada;
  }
}
