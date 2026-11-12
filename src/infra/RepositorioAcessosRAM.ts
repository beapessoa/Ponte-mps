import { Acesso } from '../entidades/Acesso.js';
import { RepositorioAcessos } from '../entidades/RepositorioAcessos.js';

/** Mantém os acessos apenas em memória: o histórico é perdido ao reiniciar o processo. */
export class RepositorioAcessosRAM implements RepositorioAcessos {
  private readonly acessos: Acesso[] = [];
  private proximoId = 1;

  adicionar(acesso: Acesso): Acesso {
    acesso.id = this.proximoId++;
    this.acessos.push(acesso);
    return acesso;
  }

  listarTodos(): Acesso[] {
    return [...this.acessos];
  }
}
