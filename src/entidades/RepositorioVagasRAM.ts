import { RepositorioVagas } from './RepositorioVagas.js';
import { Vaga } from './Vaga.js';

/** Mantém as vagas apenas em memória: a coleção é perdida ao reiniciar o processo. */
export class RepositorioVagasRAM implements RepositorioVagas {
  private readonly vagas: Vaga[] = [];
  private proximoId = 1;

  adicionar(vaga: Vaga): Vaga {
    vaga.id = this.proximoId++;
    this.vagas.push(vaga);
    return vaga;
  }

  buscarPorId(id: number): Vaga | undefined {
    return this.vagas.find((vaga) => vaga.id === id);
  }

  listarTodas(): Vaga[] {
    return [...this.vagas];
  }

  atualizar(vaga: Vaga): Vaga {
    const indice = this.vagas.findIndex((v) => v.id === vaga.id);
    if (indice === -1) {
      throw new Error(`Vaga ${vaga.id} não encontrada.`);
    }
    this.vagas[indice] = vaga;
    return vaga;
  }

  remover(id: number): void {
    const indice = this.vagas.findIndex((vaga) => vaga.id === id);
    if (indice === -1) {
      throw new Error(`Vaga ${id} não encontrada.`);
    }
    this.vagas.splice(indice, 1);
  }
}
