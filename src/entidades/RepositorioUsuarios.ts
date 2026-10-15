import { Usuario } from './Usuario.js';

export interface RepositorioUsuarios {
  adicionar(usuario: Usuario): Usuario;
  buscarPorId(id: number): Usuario | undefined;
  listarTodos(): Usuario[];
  atualizar(usuario: Usuario): Usuario;
  remover(id: number): void;
}
