import { Acesso } from './Acesso.js';

/**
 * Os acessos são um histórico: só se acrescenta e se consulta, nunca se altera.
 * A única remoção é `removerPorUsuario`, usada ao remover o usuário — sem ela,
 * um id de usuário reaproveitado herdaria no relatório o histórico de acesso
 * de quem tinha o id antes.
 */
export interface RepositorioAcessos {
  adicionar(acesso: Acesso): Acesso;
  listarTodos(): Acesso[];
  removerPorUsuario(usuarioId: number): void;
}
