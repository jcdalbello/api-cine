import AgregarSalaComando from "../../app/comandos/agregar-sala-comando";
import RepositorioSala from "../../app/dominio/puerto-repositorio-sala";
import Sala from "../../app/dominio/sala";
import CreacionSalaDTO from "../../app/dtos/creacion-sala-dto";
import SalaDTO from "../../app/dtos/sala-dto";
import CampoIncorrectoSalaError from "../../app/errores/campo-incorrecto-sala-error";
import { Mock, mock } from "ts-jest-mocker";
import MapperSalaDTOPuerto from "../../app/mappers/mapper-sala-dto-puerto";

describe("AgregarSalaComando", () => {
  const mockRepositorioSala: Mock<RepositorioSala> = mock<RepositorioSala>();
  const mockMapperSalaDTO: Mock<MapperSalaDTOPuerto> = mock<MapperSalaDTOPuerto>();
  const agregarSalaComando: AgregarSalaComando = new AgregarSalaComando(
    mockRepositorioSala,
    mockMapperSalaDTO,    
  );

  const id: number = 1;
  const capacidad: number = 50;

  const creacionSalaDTO: CreacionSalaDTO = {
    capacidad: capacidad,
  };

  const mockSalaDTO: SalaDTO = {
    id: id,
    capacidad: capacidad,
  };

  const mockSalaParaGuardar: Sala = new Sala(0, capacidad);
  const mockSala: Sala = new Sala(id, capacidad);

  beforeEach(() => {
    jest.clearAllMocks();
    mockRepositorioSala.guardar.mockResolvedValue(mockSala);
    mockMapperSalaDTO.DTOASalaParaGuardar.mockReturnValue(mockSalaParaGuardar);
    mockMapperSalaDTO.SalaADTO.mockReturnValue(mockSalaDTO);
  });

  test("deberia crear un objeto AgregarSalaComando", () => {
    expect(agregarSalaComando).toBeInstanceOf(AgregarSalaComando);
  });

  test("deberia crear correctamente una sala y devolver el resultado", async () => {
    const sala: SalaDTO = await agregarSalaComando.ejecutar(creacionSalaDTO);
    expect(sala.id).toEqual(id);
    expect(sala.capacidad).toEqual(capacidad);
  });

  test("deberia crear correctamente mas de una sala y devolver el resultado de cada una", async () => {
    const sala: SalaDTO = await agregarSalaComando.ejecutar(creacionSalaDTO);
    expect(sala.id).toEqual(id);
    expect(sala.capacidad).toEqual(capacidad);

    const id2: number = 2;
    const capacidad2: number = 100;
    const creacionSalaDTO2: CreacionSalaDTO = {
      capacidad: capacidad2,
    };
    const mockSala2: Sala = new Sala(id2, capacidad2);
    const mockSalaParaGuardar2: Sala = new Sala(0, capacidad2);
    const mockSalaDTO2: SalaDTO = {
      id: id2,
      capacidad: capacidad2,
    };
    mockRepositorioSala.guardar.mockResolvedValue(mockSala2);
    mockMapperSalaDTO.DTOASalaParaGuardar.mockReturnValue(mockSalaParaGuardar2);
    mockMapperSalaDTO.SalaADTO.mockReturnValue(mockSalaDTO2);
    const sala2: SalaDTO = await agregarSalaComando.ejecutar(creacionSalaDTO2);
    expect(sala2.id).toEqual(id2);
    expect(sala2.capacidad).toEqual(capacidad2);
  });

  test("deberia devolver un error si la capacidad es igual o menor que 0", async() => {
    const capacidadIncorrecta: number = 0;
    const creacionSalaDTOCapacidadInvalida: CreacionSalaDTO = {
      capacidad: capacidadIncorrecta,
    };
    mockMapperSalaDTO.DTOASalaParaGuardar.mockImplementation(() => { throw new CampoIncorrectoSalaError({}) });
    await expect(agregarSalaComando.ejecutar(creacionSalaDTOCapacidadInvalida)).rejects.toThrow(CampoIncorrectoSalaError);
  });

  test("deberia llamar al repositorio de salas", async () => {
    await agregarSalaComando.ejecutar(creacionSalaDTO);
    expect(mockRepositorioSala.guardar).toHaveBeenCalled();
  });
});
