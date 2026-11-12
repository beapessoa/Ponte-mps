import { RegistroDeAcesso } from '../entidades/RegistroDeAcesso.js';
import { RepositorioAcessos } from '../entidades/RepositorioAcessos.js';

/** Mantém os registros de acesso apenas em memória: a coleção é perdida ao reiniciar o processo. */
export class RepositorioAcessosRAM implements RepositorioAcessos {
  private readonly registros: RegistroDeAcesso[] = [];
  private proximoId = 1;

  adicionar(registro: RegistroDeAcesso): RegistroDeAcesso {
    registro.id = this.proximoId++;
    this.registros.push(registro);
    return registro;
  }

  listarTodos(): RegistroDeAcesso[] {
    return [...this.registros];
  }
}
