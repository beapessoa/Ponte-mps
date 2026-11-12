import { Acesso } from './Acesso.js';

/** Os acessos são um histórico: só se acrescenta e se consulta, nunca se altera nem remove. */
export interface RepositorioAcessos {
  adicionar(acesso: Acesso): Acesso;
  listarTodos(): Acesso[];
}
