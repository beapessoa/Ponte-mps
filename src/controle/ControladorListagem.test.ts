import { beforeEach, describe, expect, it } from 'vitest';
import { RepositorioUsuarios } from '../entidades/RepositorioUsuarios.js';
import { ControladorCadastro } from './ControladorCadastro.js';
import { ControladorListagem } from './ControladorListagem.js';

describe('ControladorListagem', () => {
  let repositorio: RepositorioUsuarios;
  let controladorCadastro: ControladorCadastro;
  let controladorListagem: ControladorListagem;

  beforeEach(() => {
    repositorio = new RepositorioUsuarios();
    controladorCadastro = new ControladorCadastro(repositorio);
    controladorListagem = new ControladorListagem(repositorio);
  });

  it('deve_retornar_lista_vazia_quando_nenhum_usuario_foi_cadastrado', () => {
    expect(controladorListagem.listarUsuarios()).toEqual([]);
  });

  it('deve_listar_ongs_e_voluntarios_cadastrados', () => {
    const ong = controladorCadastro.cadastrarONG('Amigos do Bairro', 'Saúde comunitária', 'Ações de saúde.');
    const voluntario = controladorCadastro.cadastrarVoluntario('Rafael', ['enfermagem'], 'manhãs', 'João Pessoa/PB');

    expect(controladorListagem.listarUsuarios()).toEqual([ong, voluntario]);
  });
});
