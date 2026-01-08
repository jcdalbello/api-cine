import Pelicula from "../../app/dominio/pelicula";
import CreacionPeliculaDTO from "../../app/dtos/creacion-pelicula-dto";
import MapperPeliculaDTO from "../../app/mappers/mapper-pelicula-dto";

describe("MapperPeliculaDTO", () => {
  const peliculaDTO: MapperPeliculaDTO = new MapperPeliculaDTO();

  const titulo: string = "pelicula";
  const genero: string = "genero";

  test("deberia crear un objeto MapperPeliculaDTO", () => {
    expect(peliculaDTO).toBeInstanceOf(MapperPeliculaDTO);
  });

  describe("DTOAPeliculaParaGuardar", () => {
    test("deberia crear un pelicula con los datos de la pelicula", () => {
      const creacionPeliculaDTO: CreacionPeliculaDTO = {
        titulo: titulo,
        genero: genero,
      };

      const pelicula: Pelicula = peliculaDTO.DTOAPeliculaParaGuardar(creacionPeliculaDTO);
      expect(pelicula.obtenerTitulo()).toEqual(titulo);
      expect(pelicula.obtenerGenero()).toEqual(genero);
    });

    test("deberia crear un pelicula con los datos de cada pelicula", () => {
      const creacionPeliculaDTO: CreacionPeliculaDTO = {
        titulo: titulo,
        genero: genero,
      };

      const titulo2: string = "pelicula2";
      const genero2: string = "genero2";
      const creacionPeliculaDTO2: CreacionPeliculaDTO = {
        titulo: titulo2,
        genero: genero2,
      };

      const pelicula: Pelicula = peliculaDTO.DTOAPeliculaParaGuardar(creacionPeliculaDTO);
      const pelicula2: Pelicula = peliculaDTO.DTOAPeliculaParaGuardar(creacionPeliculaDTO2);
      expect(pelicula.obtenerTitulo()).toEqual(titulo);
      expect(pelicula.obtenerGenero()).toEqual(genero);
      expect(pelicula2.obtenerTitulo()).toEqual(titulo2);
      expect(pelicula2.obtenerGenero()).toEqual(genero2);
    });
  });
});
