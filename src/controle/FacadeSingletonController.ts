import { AdaptadorRegistradorPino } from '../infra/AdaptadorRegistradorPino.js';
import { criarFabricaRepositorios, TipoPersistencia } from '../infra/fabricaRepositorios.js';
import { FabricaRepositorios } from '../entidades/FabricaRepositorios.js';
import { Ong } from '../entidades/Ong.js';
import { Registrador } from '../entidades/Registrador.js';
import { Usuario } from '../entidades/Usuario.js';
import { Vaga } from '../entidades/Vaga.js';
import { Voluntario } from '../entidades/Voluntario.js';
import { ControladorAcessos, FormatoRelatorio } from './ControladorAcessos.js';
import { ControladorCadastro } from './ControladorCadastro.js';
import { ControladorListagem } from './ControladorListagem.js';
import { ControladorVagas } from './ControladorVagas.js';
import { Invocador } from './comandos/Comando.js';
import {
  ComandoAtualizarONG,
  ComandoAtualizarVaga,
  ComandoAtualizarVoluntario,
  ComandoCadastrarONG,
  ComandoCadastrarVoluntario,
  ComandoEntrar,
  ComandoGerarRelatorioAcessos,
  ComandoPublicarVaga,
  ComandoRemoverUsuario,
  ComandoRemoverVaga,
} from './comandos/ComandosFachada.js';

/**
 * Fachada única (Facade) para os Controllers do sistema, acessível por uma
 * única instância compartilhada (Singleton). Unifica cadastro/listagem de
 * usuários, o CRUD de vagas e os acessos atrás de uma única API. As operações
 * que alteram estado ou autenticam viram Comandos (Command) executados por um
 * `Invocador`, que também desfaz a última atualização de vaga (Memento).
 */
export class FacadeSingletonController {
  private static instancia: FacadeSingletonController | undefined;

  private readonly controladorCadastro: ControladorCadastro;
  private readonly controladorListagem: ControladorListagem;
  private readonly controladorVagas: ControladorVagas;
  private readonly controladorAcessos: ControladorAcessos;
  private readonly invocador = new Invocador();

  private constructor(
    fabrica: FabricaRepositorios,
    private readonly registrador: Registrador,
  ) {
    const repositorioUsuarios = fabrica.criarRepositorioUsuarios();
    const repositorioAcessos = fabrica.criarRepositorioAcessos();
    this.controladorCadastro = new ControladorCadastro(repositorioUsuarios, repositorioAcessos);
    this.controladorListagem = new ControladorListagem(repositorioUsuarios);
    this.controladorVagas = new ControladorVagas(fabrica.criarRepositorioVagas(), repositorioUsuarios);
    this.controladorAcessos = new ControladorAcessos(repositorioUsuarios, repositorioAcessos, registrador);
  }

  /**
   * Cria a única instância escolhendo o mecanismo de persistência de todas as entidades.
   * Deve ser chamado uma vez, no início da execução, antes de `obterInstancia()`.
   */
  static inicializar(tipoPersistencia: TipoPersistencia, registrador?: Registrador): FacadeSingletonController {
    if (FacadeSingletonController.instancia) {
      throw new Error('A fachada já foi inicializada.');
    }
    FacadeSingletonController.instancia = new FacadeSingletonController(
      criarFabricaRepositorios(tipoPersistencia),
      registrador ?? new AdaptadorRegistradorPino(),
    );
    return FacadeSingletonController.instancia;
  }

  /** Retorna a única instância da fachada, criando-a com as dependências padrão na primeira chamada. */
  static obterInstancia(): FacadeSingletonController {
    if (!FacadeSingletonController.instancia) {
      FacadeSingletonController.instancia = new FacadeSingletonController(
        criarFabricaRepositorios(),
        new AdaptadorRegistradorPino(),
      );
    }
    return FacadeSingletonController.instancia;
  }

  /** Fecha o registrador e descarta a instância atual, forçando a próxima `obterInstancia()` a criar uma nova. Uso em testes. */
  static reiniciar(): void {
    FacadeSingletonController.instancia?.registrador.fechar();
    FacadeSingletonController.instancia = undefined;
  }

  cadastrarONG(nome: string, login: string, senha: string, areaAtuacao: string, descricao: string): Ong {
    return this.invocador.executar(
      new ComandoCadastrarONG(this.controladorCadastro, nome, login, senha, areaAtuacao, descricao),
    );
  }

  cadastrarVoluntario(
    nome: string,
    login: string,
    senha: string,
    habilidades: string[],
    disponibilidade: string,
    localizacao: string,
  ): Voluntario {
    return this.invocador.executar(
      new ComandoCadastrarVoluntario(this.controladorCadastro, nome, login, senha, habilidades, disponibilidade, localizacao),
    );
  }

  listarUsuarios(): Omit<Usuario, 'senha'>[] {
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
    return this.invocador.executar(
      new ComandoAtualizarONG(this.controladorCadastro, id, nome, login, senha, areaAtuacao, descricao),
    );
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
    return this.invocador.executar(
      new ComandoAtualizarVoluntario(this.controladorCadastro, id, nome, login, senha, habilidades, disponibilidade, localizacao),
    );
  }

  removerUsuario(id: number): void {
    this.invocador.executar(new ComandoRemoverUsuario(this.controladorCadastro, id));
  }

  publicarVaga(
    ongId: number,
    data: string,
    local: string,
    quantidadeVagas: number,
    habilidadesExigidas: string[],
  ): Vaga {
    return this.invocador.executar(
      new ComandoPublicarVaga(this.controladorVagas, ongId, data, local, quantidadeVagas, habilidadesExigidas),
    );
  }

  buscarVaga(id: number): Vaga | undefined {
    return this.controladorVagas.buscarVaga(id);
  }

  listarVagas(): Vaga[] {
    return this.controladorVagas.listarVagas();
  }

  atualizarVaga(id: number, dados: Partial<Pick<Vaga, 'data' | 'local' | 'quantidadeVagas' | 'habilidadesExigidas'>>): Vaga {
    return this.invocador.executar(new ComandoAtualizarVaga(this.controladorVagas, id, dados));
  }

  /** Desfaz a última atualização de vaga feita por esta fachada (só um nível, sem refazer). */
  desfazerUltimaAtualizacaoDeVaga(): void {
    this.invocador.desfazerUltimo();
  }

  removerVaga(id: number): void {
    this.invocador.executar(new ComandoRemoverVaga(this.controladorVagas, id));
  }

  entrar(login: string, senha: string): Omit<Usuario, 'senha'> {
    return this.invocador.executar(new ComandoEntrar(this.controladorAcessos, login, senha));
  }

  gerarRelatorioAcessos(formato: FormatoRelatorio): string {
    return this.invocador.executar(new ComandoGerarRelatorioAcessos(this.controladorAcessos, formato));
  }

  /** Quantidade total de entidades cadastradas no sistema (usuários + vagas). */
  contarEntidadesCadastradas(): number {
    return this.controladorListagem.listarUsuarios().length + this.controladorVagas.listarVagas().length;
  }
}
