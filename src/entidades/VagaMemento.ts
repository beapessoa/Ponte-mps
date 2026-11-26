import type { Vaga } from './Vaga.js';

/** Memento: retrato imutável dos campos editáveis de uma `Vaga`, guardado para poder desfazer uma atualização. */
export class VagaMemento {
  readonly data: string;
  readonly local: string;
  readonly quantidadeVagas: number;
  readonly habilidadesExigidas: readonly string[];

  constructor(vaga: Vaga) {
    this.data = vaga.data;
    this.local = vaga.local;
    this.quantidadeVagas = vaga.quantidadeVagas;
    this.habilidadesExigidas = [...vaga.habilidadesExigidas];
  }
}
