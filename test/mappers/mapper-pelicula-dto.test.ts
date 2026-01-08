import Pelicula from "../../app/dominio/pelicula";
import CreacionPeliculaDTO from "../../app/dtos/creacion-pelicula-dto";
import PeliculaDTO from "../../app/dtos/pelicula-dto";
import MapperPeliculaDTO from "../../app/mappers/mapper-pelicula-dto";

describe("MapperPeliculaDTO", () => {
  const mapperPeliculaDTO: MapperPeliculaDTO = new MapperPeliculaDTO();

  const titulo: string = "pelicula";
  const genero: string = "genero";
  
  const creacionPeliculaDTO: CreacionPeliculaDTO = {
    titulo: titulo,
    genero: genero,
  };

  test("deberia crear un objeto MapperPeliculaDTO", () => {
    expect(mapperPeliculaDTO).toBeInstanceOf(MapperPeliculaDTO);
  });

  describe("DTOAPeliculaParaGuardar", () => {
    test("deberia crear un pelicula con los datos de la pelicula", () => {
      

      const pelicula: Pelicula = mapperPeliculaDTO.DTOAPeliculaParaGuardar(creacionPeliculaDTO);
      expect(pelicula.obtenerId()).toEqual(0);
      expect(pelicula.obtenerTitulo()).toEqual(titulo);
      expect(pelicula.obtenerGenero()).toEqual(genero);
    });

    test("deberia crear un pelicula con los datos de cada pelicula", () => {
      const titulo2: string = "pelicula2";
      const genero2: string = "genero2";
      const creacionPeliculaDTO2: CreacionPeliculaDTO = {
        titulo: titulo2,
        genero: genero2,
      };

      const pelicula: Pelicula = mapperPeliculaDTO.DTOAPeliculaParaGuardar(creacionPeliculaDTO);
      const pelicula2: Pelicula = mapperPeliculaDTO.DTOAPeliculaParaGuardar(creacionPeliculaDTO2);
      expect(pelicula.obtenerTitulo()).toEqual(titulo);
      expect(pelicula.obtenerGenero()).toEqual(genero);
      expect(pelicula2.obtenerTitulo()).toEqual(titulo2);
      expect(pelicula2.obtenerGenero()).toEqual(genero2);
    });
  });

  describe("PeliculaADTO", () => {
    test("deberia devolver un dto con los datos de la pelicula", () => {
      const peliculaDTO: PeliculaDTO = {
        id: 1,
        titulo: titulo,
        genero: genero,
      };
      const pelicula: Pelicula = new Pelicula(
        peliculaDTO.id,
        peliculaDTO.titulo,
        peliculaDTO.genero
      );
      const peliculaADTO: PeliculaDTO = mapperPeliculaDTO.PeliculaADTO(pelicula);
      expect(peliculaADTO.id).toEqual(peliculaDTO.id);
      expect(peliculaADTO.titulo).toEqual(peliculaDTO.titulo);
      expect(peliculaADTO.genero).toEqual(peliculaDTO.genero);
    });
  });
});
