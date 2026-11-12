import { RepositorioAcessos } from './RepositorioAcessos.js';
import { RepositorioUsuarios } from './RepositorioUsuarios.js';
import { RepositorioVagas } from './RepositorioVagas.js';

/**
 * Abstract Factory: cria a família inteira de repositórios de um mesmo mecanismo
 * de persistência, para que usuários, vagas e acessos nunca fiquem em mecanismos
 * diferentes na mesma execução. Ver ADR-0003.
 */
export interface FabricaRepositorios {
  criarRepositorioUsuarios(): RepositorioUsuarios;
  criarRepositorioVagas(): RepositorioVagas;
  criarRepositorioAcessos(): RepositorioAcessos;
}
