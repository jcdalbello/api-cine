import RepositorioPelicula from "../dominio/puerto-repositorio-pelicula";
import CreacionPeliculaDTO from "../dtos/creacion-pelicula-dto";
import PeliculaDTO from "../dtos/pelicula-dto";
import Pelicula from "../dominio/pelicula";

export default class AgregarPeliculaComando {
  constructor(
    private readonly repositorioPelicula: RepositorioPelicula,
  ) {}

  public async ejecutar(creacionPeliculaDTO: CreacionPeliculaDTO): Promise<PeliculaDTO> {
    const peliculaSinGuardar: Pelicula = new Pelicula(0, creacionPeliculaDTO.titulo, creacionPeliculaDTO.genero);
    const peliculaGuardada: Pelicula = await this.repositorioPelicula.guardar(peliculaSinGuardar);

    const peliculaDTO: PeliculaDTO = {
      id: peliculaGuardada.obtenerId(),
      titulo: peliculaGuardada.obtenerTitulo(),
      genero: peliculaGuardada.obtenerGenero(),
    };

    return peliculaDTO;
  }
}
