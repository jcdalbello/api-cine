import Sala from "../../app/dominio/sala";
import CreacionSalaDTO from "../../app/dtos/creacion-sala-dto";
import ListaSalasDTO from "../../app/dtos/lista-salas-dto";
import SalaDTO from "../../app/dtos/sala-dto";
import MapperSalaDTO from "../../app/mappers/mapper-sala-dto";

describe("SalaMapper", () => {
  const salaMapper: MapperSalaDTO = new MapperSalaDTO();

  test("deberia crear un objeto SalaMapper", () => {
    expect(salaMapper).toBeInstanceOf(MapperSalaDTO);
  });

  describe("DTOASalaParaGuardar", () => {
    const capacidad: number = 50;
    const creacionSalaDTO: CreacionSalaDTO = {
      capacidad: capacidad,
    }

    test("deberia crear una sala sin id con los datos del dto de creacion de sala", () => {
      const sala: Sala = salaMapper.DTOASalaParaGuardar(creacionSalaDTO);
      expect(sala).toBeInstanceOf(Sala);
      expect(sala.obtenerId()).toEqual(0);
      expect(sala.obtenerCapacidad()).toEqual(capacidad);
    });

    test("deberia crear varias salas sin id con los datos de cada dto de creacion de sala", () => {
      const sala: Sala = salaMapper.DTOASalaParaGuardar(creacionSalaDTO);
      expect(sala).toBeInstanceOf(Sala);
      expect(sala.obtenerId()).toEqual(0);
      expect(sala.obtenerCapacidad()).toEqual(capacidad);

      const capacidad2: number = 100;
      const creacionSalaDTO2: CreacionSalaDTO = {
        capacidad: capacidad2,
      }
      const sala2: Sala = salaMapper.DTOASalaParaGuardar(creacionSalaDTO2);
      expect(sala2).toBeInstanceOf(Sala);
      expect(sala2.obtenerId()).toEqual(0);
      expect(sala2.obtenerCapacidad()).toEqual(capacidad2);
    });
  });

  describe("SalaADTO", () => {
    test("deberia crear un dto de sala con los datos de la sala", () => {
      const id: number = 1;
      const capacidad: number = 50;
      const sala: Sala = new Sala(id, capacidad);
      const salaDTO: SalaDTO = salaMapper.SalaADTO(sala);
      expect(salaDTO.id).toEqual(id);
      expect(salaDTO.capacidad).toEqual(capacidad);
    });
  });

  describe("listaSalasADTO", () => {
    test("deberia devolver un DTO con una lista vacia si se le pasa una lista vacia", () => {
      const salas: Sala[] = [];
      const salasDTO: ListaSalasDTO = salaMapper.listaSalasADTO(salas);
      expect(salasDTO.salas.length).toEqual(0);
      expect(salasDTO.salas).toEqual([]);
    });
  });
});