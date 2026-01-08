import SalaMapper from "../../app/mappers/sala-mapper";

describe("SalaMapper", () => {
  const salaMapper: SalaMapper = new SalaMapper();

  test("deberia crear un objeto SalaMapper", () => {
    expect(salaMapper).toBeInstanceOf(SalaMapper);
  });
});