import { criarRepositorioUsuarios } from '../entidades/fabricaRepositorioUsuarios.js';
import { Ong } from '../entidades/Ong.js';
import { RepositorioUsuarios } from '../entidades/RepositorioUsuarios.js';
import { RepositorioVagas } from '../entidades/RepositorioVagas.js';
import { RepositorioVagasRAM } from '../entidades/RepositorioVagasRAM.js';
import { Usuario } from '../entidades/Usuario.js';
import { Vaga } from '../entidades/Vaga.js';
import { Voluntario } from '../entidades/Voluntario.js';
import { ControladorCadastro } from './ControladorCadastro.js';
import { ControladorListagem } from './ControladorListagem.js';
import { ControladorVagas } from './ControladorVagas.js';

/**
 * Fachada única (Facade) para os Controllers do sistema, acessível por uma
 * única instância compartilhada (Singleton). Unifica cadastro/listagem de
 * usuários e o CRUD de vagas atrás de uma única API.
 */
export class FacadeSingletonController {
  private static instancia: FacadeSingletonController | undefined;

  private readonly controladorCadastro: ControladorCadastro;
  private readonly controladorListagem: ControladorListagem;
  private readonly controladorVagas: ControladorVagas;

  private constructor(repositorioUsuarios: RepositorioUsuarios, repositorioVagas: RepositorioVagas) {
    this.controladorCadastro = new ControladorCadastro(repositorioUsuarios);
    this.controladorListagem = new ControladorListagem(repositorioUsuarios);
    this.controladorVagas = new ControladorVagas(repositorioVagas);
  }

  /** Retorna a única instância da fachada, criando-a com as dependências padrão na primeira chamada. */
  static obterInstancia(): FacadeSingletonController {
    if (!FacadeSingletonController.instancia) {
      FacadeSingletonController.instancia = new FacadeSingletonController(
        criarRepositorioUsuarios(),
        new RepositorioVagasRAM(),
      );
    }
    return FacadeSingletonController.instancia;
  }

  /** Descarta a instância atual, forçando a próxima `obterInstancia()` a criar uma nova. Uso em testes. */
  static reiniciar(): void {
    FacadeSingletonController.instancia = undefined;
  }

  cadastrarONG(nome: string, login: string, senha: string, areaAtuacao: string, descricao: string): Ong {
    return this.controladorCadastro.cadastrarONG(nome, login, senha, areaAtuacao, descricao);
  }

  cadastrarVoluntario(
    nome: string,
    login: string,
    senha: string,
    habilidades: string[],
    disponibilidade: string,
    localizacao: string,
  ): Voluntario {
    return this.controladorCadastro.cadastrarVoluntario(
      nome,
      login,
      senha,
      habilidades,
      disponibilidade,
      localizacao,
    );
  }

  listarUsuarios(): Usuario[] {
    return this.controladorListagem.listarUsuarios();
  }

  atualizarONG(
    id: number,
    nome: string,
    login: string,
    senha: string,
    areaAtuacao: string,
    descricao: string,
  ): Ong {
    return this.controladorCadastro.atualizarONG(id, nome, login, senha, areaAtuacao, descricao);
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
    return this.controladorCadastro.atualizarVoluntario(
      id,
      nome,
      login,
      senha,
      habilidades,
      disponibilidade,
      localizacao,
    );
  }

  removerUsuario(id: number): void {
    this.controladorCadastro.removerUsuario(id);
  }

  publicarVaga(
    ongId: number,
    data: string,
    local: string,
    quantidadeVagas: number,
    habilidadesExigidas: string[],
  ): Vaga {
    return this.controladorVagas.publicarVaga(ongId, data, local, quantidadeVagas, habilidadesExigidas);
  }

  buscarVaga(id: number): Vaga | undefined {
    return this.controladorVagas.buscarVaga(id);
  }

  listarVagas(): Vaga[] {
    return this.controladorVagas.listarVagas();
  }

  atualizarVaga(id: number, dados: Partial<Pick<Vaga, 'data' | 'local' | 'quantidadeVagas' | 'habilidadesExigidas'>>): Vaga {
    return this.controladorVagas.atualizarVaga(id, dados);
  }

  removerVaga(id: number): void {
    this.controladorVagas.removerVaga(id);
  }

  /** Quantidade total de entidades cadastradas no sistema (usuários + vagas). */
  contarEntidadesCadastradas(): number {
    return this.controladorListagem.listarUsuarios().length + this.controladorVagas.listarVagas().length;
  }
}
