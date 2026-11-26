import { VagaMemento } from './VagaMemento.js';

/** Originator do Memento: sabe tirar e restaurar um retrato de si mesma. */
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

  criarMemento(): VagaMemento {
    return new VagaMemento(this);
  }

  restaurar(memento: VagaMemento): void {
    this.data = memento.data;
    this.local = memento.local;
    this.quantidadeVagas = memento.quantidadeVagas;
    this.habilidadesExigidas = [...memento.habilidadesExigidas];
  }
}
