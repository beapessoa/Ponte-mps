import { Vaga } from './Vaga.js';

export interface RepositorioVagas {
  adicionar(vaga: Vaga): Vaga;
  buscarPorId(id: number): Vaga | undefined;
  listarTodas(): Vaga[];
  atualizar(vaga: Vaga): Vaga;
  remover(id: number): void;
}
