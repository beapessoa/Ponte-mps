export class Vaga {
  id?: number;
  ongId: number;
  data: string;
  local: string;
  quantidadeVagas: number;
  habilidadesExigidas: string[];

  constructor(
    ongId: number,
    data: string,
    local: string,
    quantidadeVagas: number,
    habilidadesExigidas: string[],
  ) {
    this.ongId = ongId;
    this.data = data;
    this.local = local;
    this.quantidadeVagas = quantidadeVagas;
    this.habilidadesExigidas = habilidadesExigidas;
  }
}
