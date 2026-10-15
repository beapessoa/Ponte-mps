import { Ong } from '../entidades/Ong.js';
import { RepositorioUsuarios } from '../entidades/RepositorioUsuarios.js';
import { Voluntario } from '../entidades/Voluntario.js';

export class ControladorCadastro {
  constructor(private readonly repositorio: RepositorioUsuarios) {}

  cadastrarONG(
    nome: string,
    login: string,
    senha: string,
    areaAtuacao: string,
    descricao: string,
  ): Ong {
    if (!nome || !areaAtuacao || !descricao) {
      throw new Error('Nome, área de atuação e descrição são obrigatórios para cadastrar uma ONG.');
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
    if (!nome || habilidades.length === 0 || !disponibilidade || !localizacao) {
      throw new Error(
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
      throw new Error(`ONG ${id} não encontrada.`);
    }
    if (!nome || !areaAtuacao || !descricao) {
      throw new Error('Nome, área de atuação e descrição são obrigatórios para atualizar uma ONG.');
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
      throw new Error(`Voluntário ${id} não encontrado.`);
    }
    if (!nome || habilidades.length === 0 || !disponibilidade || !localizacao) {
      throw new Error(
        'Nome, habilidades, disponibilidade e localização são obrigatórios para atualizar um voluntário.',
      );
    }

    const voluntario = new Voluntario(nome, login, senha, habilidades, disponibilidade, localizacao);
    voluntario.id = id;
    this.repositorio.atualizar(voluntario);
    return voluntario;
  }

  removerUsuario(id: number): void {
    this.repositorio.remover(id);
  }
}
