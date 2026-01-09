import Funcion from "../../app/dominio/funcion";
import Pelicula from "../../app/dominio/pelicula";
import Sala from "../../app/dominio/sala";
import FuncionDTO from "../../app/dtos/funcion-dto";
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
});
