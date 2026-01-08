import Sala from "../../app/dominio/sala";
import CreacionSalaDTO from "../../app/dtos/creacion-sala-dto";
import SalaMapper from "../../app/mappers/sala-mapper";

describe("SalaMapper", () => {
  const salaMapper: SalaMapper = new SalaMapper();

  test("deberia crear un objeto SalaMapper", () => {
    expect(salaMapper).toBeInstanceOf(SalaMapper);
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
});