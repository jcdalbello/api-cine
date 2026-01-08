import MapperFuncionDTO from "../../app/mappers/mapper-funcion-dto";

describe("MapperFuncionDTO", () => {
  const mapperFuncionDTO: MapperFuncionDTO = new MapperFuncionDTO();

  test("deberia crear un objeto MapperPeliculaDTO", () => {
    expect(mapperFuncionDTO).toBeInstanceOf(MapperFuncionDTO);
  });
});
