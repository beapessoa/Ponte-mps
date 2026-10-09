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
    if (!nome.trim() || !areaAtuacao.trim() || !descricao.trim()) {
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
    if (!nome.trim() || habilidades.length === 0 || !disponibilidade.trim() || !localizacao.trim()) {
      throw new Error(
        'Nome, habilidades, disponibilidade e localização são obrigatórios para cadastrar um voluntário.',
      );
    }

    const voluntario = new Voluntario(nome, login, senha, habilidades, disponibilidade, localizacao);
    this.repositorio.adicionar(voluntario);
    return voluntario;
  }
}
