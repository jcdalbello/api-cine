import Funcion from "../../app/dominio/funcion";
import Pelicula from "../../app/dominio/pelicula";
import Sala from "../../app/dominio/sala";
import FuncionDTO from "../../app/dtos/funcion-dto";
import ListaFuncionesDTO from "../../app/dtos/lista-funciones-dto";
import MapperFuncionDTO from "../../app/mappers/mapper-funcion-dto";
import MapperPeliculaDTO from "../../app/mappers/mapper-pelicula-dto";
import MapperSalaDTO from "../../app/mappers/mapper-sala-dto";

describe("MapperFuncionDTO", () => {
  const mapperFuncionDTO: MapperFuncionDTO = new MapperFuncionDTO(
    new MapperSalaDTO(),
    new MapperPeliculaDTO(),
  );

  test("deberia crear un objeto MapperFuncionDTO", () => {
    expect(mapperFuncionDTO).toBeInstanceOf(MapperFuncionDTO);
  });

  describe("FuncionADTO", () => {
    test("deberia crear un dto de funcion con los datos de la funcion", () => {
      const idFuncion: number = 1;
      const sala: Sala = new Sala(1, 50);
      const pelicula: Pelicula = new Pelicula(1, "pelicula", "genero");
      const funcion: Funcion = new Funcion(
        idFuncion,
        sala,
        pelicula,
      );

      const funcionDTO: FuncionDTO = mapperFuncionDTO.FuncionADTO(funcion);
      expect(funcionDTO.id).toEqual(idFuncion);
      expect(funcionDTO.sala).toEqual(sala);
      expect(funcionDTO.pelicula).toEqual(pelicula);
    });
  });

  describe("ListaFuncionesADTO", () => {
    test("deberia devolver un dto con una lista vacia si se le pasa una lista vacia de funciones", () => {
      const funciones: Funcion[] = [];
      const funcionesDTO: ListaFuncionesDTO = mapperFuncionDTO.ListaFuncionesADTO(funciones);
      expect(funcionesDTO.funciones.length).toEqual(0);
      expect(funcionesDTO.funciones).toEqual([]);
    });

    test("deberia devolver un dto con una lista de funciones", () => {
      const idFuncion: number = 1;
      const sala: Sala = new Sala(1, 50);
      const pelicula: Pelicula = new Pelicula(1, "pelicula", "genero");
      const funcion: Funcion = new Funcion(
        idFuncion,
        sala,
        pelicula,
      );
      const funciones: Funcion[] = [funcion];

      const funcionesDTO: ListaFuncionesDTO = mapperFuncionDTO.ListaFuncionesADTO(funciones);
      expect(funcionesDTO.funciones.length).toEqual(1);
      expect(funcionesDTO.funciones).toContainEqual(funcion);
    });
  });
});
