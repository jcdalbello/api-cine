import Pelicula from "../../app/dominio/pelicula";
import CreacionPeliculaDTO from "../../app/dtos/creacion-pelicula-dto";
import ListaPeliculasDTO from "../../app/dtos/lista-peliculas-dto";
import PeliculaDTO from "../../app/dtos/pelicula-dto";
import MapperPeliculaDTO from "../../app/mappers/mapper-pelicula-dto";

describe("MapperPeliculaDTO", () => {
  const mapperPeliculaDTO: MapperPeliculaDTO = new MapperPeliculaDTO();

  const id: number = 1;
  const titulo: string = "pelicula";
  const genero: string = "genero";
  
  const creacionPeliculaDTO: CreacionPeliculaDTO = {
    titulo: titulo,
    genero: genero,
  };

  const peliculaDTO: PeliculaDTO = {
    id: id,
    titulo: titulo,
    genero: genero,
  };

  const pelicula: Pelicula = new Pelicula(
    peliculaDTO.id,
    peliculaDTO.titulo,
    peliculaDTO.genero
  );

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
      const peliculaADTO: PeliculaDTO = mapperPeliculaDTO.PeliculaADTO(pelicula);
      expect(peliculaADTO.id).toEqual(peliculaDTO.id);
      expect(peliculaADTO.titulo).toEqual(peliculaDTO.titulo);
      expect(peliculaADTO.genero).toEqual(peliculaDTO.genero);
    });

    test("deberia devolver un dto con los datos de cada pelicula", () => {
      const pelicula2DTO: PeliculaDTO = {
        id: id + 1,
        titulo: titulo + "1",
        genero: genero + "1",
      };
      const pelicula2: Pelicula = new Pelicula(
        pelicula2DTO.id,
        pelicula2DTO.titulo,
        pelicula2DTO.genero
      );
      const peliculaADTO: PeliculaDTO = mapperPeliculaDTO.PeliculaADTO(pelicula);
      expect(peliculaADTO.id).toEqual(peliculaDTO.id);
      expect(peliculaADTO.titulo).toEqual(peliculaDTO.titulo);
      expect(peliculaADTO.genero).toEqual(peliculaDTO.genero);

      const pelicula2ADTO: PeliculaDTO = mapperPeliculaDTO.PeliculaADTO(pelicula2);
      expect(pelicula2ADTO.id).toEqual(pelicula2DTO.id);
      expect(pelicula2ADTO.titulo).toEqual(pelicula2DTO.titulo);
      expect(pelicula2ADTO.genero).toEqual(pelicula2DTO.genero);
    });
  });

  describe("listaPeliculasADTO", () => {
    test("deberia devolver un DTO con una lista vacia si se le pasa una lista vacia", () => {
      const peliculas: Pelicula[] = [];
      const peliculasDTO: ListaPeliculasDTO = mapperPeliculaDTO.listaPeliculasADTO(peliculas);
      expect(peliculasDTO.peliculas.length).toEqual(0);
      expect(peliculasDTO.peliculas).toEqual([]);
    });

    test("deberia devolver un DTO con una sola pelicula si se le pasa una sola sala", () => {
      const cantidadDePeliculas: number = 1;
      const pelicula: Pelicula = new Pelicula(
        id,
        titulo,
        genero,
      );
      const peliculas: Pelicula[] = [pelicula];
      const peliculasDTO: ListaPeliculasDTO = mapperPeliculaDTO.listaPeliculasADTO(peliculas);
      expect(peliculasDTO.peliculas.length).toEqual(cantidadDePeliculas);
      expect(peliculasDTO.peliculas[0]).toEqual(peliculas[0]);
    });

    test("deberia devolver un DTO con todas las peliculas que se le pasen", () => {
      const cantidadDePeliculas: number = 2;
      const pelicula: Pelicula = new Pelicula(
        id,
        titulo,
        genero,
      );

      const pelicula2: Pelicula = new Pelicula(
        id + 1,
        titulo + "2",
        genero + "2",
      );
      const peliculas: Pelicula[] = [pelicula, pelicula2];
      const peliculasDTO: ListaPeliculasDTO = mapperPeliculaDTO.listaPeliculasADTO(peliculas);
      expect(peliculasDTO.peliculas.length).toEqual(cantidadDePeliculas);
      expect(peliculasDTO.peliculas).toContainEqual(pelicula);
      expect(peliculasDTO.peliculas).toContainEqual(pelicula2);
    });
  });
});
