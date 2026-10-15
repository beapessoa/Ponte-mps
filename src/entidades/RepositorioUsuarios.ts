import { Usuario } from './Usuario.js';

export interface RepositorioUsuarios {
  adicionar(usuario: Usuario): Usuario;
  listarTodos(): Usuario[];
}
