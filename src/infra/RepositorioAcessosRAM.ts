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

  removerPorUsuario(usuarioId: number): void {
    for (let i = this.acessos.length - 1; i >= 0; i--) {
      if (this.acessos[i].usuarioId === usuarioId) {
        this.acessos.splice(i, 1);
      }
    }
  }
}
