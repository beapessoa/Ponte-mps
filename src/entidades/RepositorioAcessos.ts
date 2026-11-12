import { RegistroDeAcesso } from './RegistroDeAcesso.js';

/** Log de apenas-inserção: não há atualização nem remoção de um acesso já registrado. */
export interface RepositorioAcessos {
  adicionar(registro: RegistroDeAcesso): RegistroDeAcesso;
  listarTodos(): RegistroDeAcesso[];
}
