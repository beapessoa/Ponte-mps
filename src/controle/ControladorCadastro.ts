import { Ong } from '../entidades/Ong.js';
import { RepositorioAcessos } from '../entidades/RepositorioAcessos.js';
import { RepositorioUsuarios } from '../entidades/RepositorioUsuarios.js';
import { Voluntario } from '../entidades/Voluntario.js';
import { CamposObrigatoriosError } from '../entidades/erros/ErroDeValidacao.js';
import { EntidadeNaoEncontradaError } from '../entidades/erros/EntidadeNaoEncontradaError.js';

export class ControladorCadastro {
  constructor(
    private readonly repositorio: RepositorioUsuarios,
    private readonly repositorioAcessos?: RepositorioAcessos,
  ) {}

  cadastrarONG(
    nome: string,
    login: string,
    senha: string,
    areaAtuacao: string,
    descricao: string,
  ): Ong {
    if (!nome.trim() || !areaAtuacao.trim() || !descricao.trim()) {
      throw new CamposObrigatoriosError('Nome, área de atuação e descrição são obrigatórios para cadastrar uma ONG.');
    }

    const ong = new Ong(nome, login, senha, areaAtuacao, descricao);
    this.repositorio.adicionar(ong);
    return ong;
  }

  cadastrarVoluntario(
    nome: string,
    login: string,
    senha: string,
    habilidades: string[],
    disponibilidade: string,
    localizacao: string,
  ): Voluntario {
    if (!nome.trim() || habilidades.length === 0 || !disponibilidade.trim() || !localizacao.trim()) {
      throw new CamposObrigatoriosError(
        'Nome, habilidades, disponibilidade e localização são obrigatórios para cadastrar um voluntário.',
      );
    }

    const voluntario = new Voluntario(nome, login, senha, habilidades, disponibilidade, localizacao);
    this.repositorio.adicionar(voluntario);
    return voluntario;
  }

  atualizarONG(
    id: number,
    nome: string,
    login: string,
    senha: string,
    areaAtuacao: string,
    descricao: string,
  ): Ong {
    const existente = this.repositorio.buscarPorId(id);
    if (!existente || !(existente instanceof Ong)) {
      throw new EntidadeNaoEncontradaError(`ONG ${id} não encontrada.`);
    }
    if (!nome || !areaAtuacao || !descricao) {
      throw new CamposObrigatoriosError('Nome, área de atuação e descrição são obrigatórios para atualizar uma ONG.');
    }

    const ong = new Ong(nome, login, senha, areaAtuacao, descricao);
    ong.id = id;
    this.repositorio.atualizar(ong);
    return ong;
  }

  atualizarVoluntario(
    id: number,
    nome: string,
    login: string,
    senha: string,
    habilidades: string[],
    disponibilidade: string,
    localizacao: string,
  ): Voluntario {
    const existente = this.repositorio.buscarPorId(id);
    if (!existente || !(existente instanceof Voluntario)) {
      throw new EntidadeNaoEncontradaError(`Voluntário ${id} não encontrado.`);
    }
    if (!nome || habilidades.length === 0 || !disponibilidade || !localizacao) {
      throw new CamposObrigatoriosError(
        'Nome, habilidades, disponibilidade e localização são obrigatórios para atualizar um voluntário.',
      );
    }

    const voluntario = new Voluntario(nome, login, senha, habilidades, disponibilidade, localizacao);
    voluntario.id = id;
    this.repositorio.atualizar(voluntario);
    return voluntario;
  }

  /** Remove o usuário e seu histórico de acessos, para que um id reaproveitado não herde acessos de outra pessoa. */
  removerUsuario(id: number): void {
    this.repositorio.remover(id);
    this.repositorioAcessos?.removerPorUsuario(id);
  }
}
