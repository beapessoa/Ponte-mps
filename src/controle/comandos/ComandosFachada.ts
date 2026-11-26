import { Ong } from '../../entidades/Ong.js';
import { Vaga } from '../../entidades/Vaga.js';
import { VagaMemento } from '../../entidades/VagaMemento.js';
import { Voluntario } from '../../entidades/Voluntario.js';
import { Usuario } from '../../entidades/Usuario.js';
import { ControladorAcessos, FormatoRelatorio } from '../ControladorAcessos.js';
import { ControladorCadastro } from '../ControladorCadastro.js';
import { ControladorVagas } from '../ControladorVagas.js';
import { Comando, ComandoDesfazivel } from './Comando.js';

/** Comandos (Command) que a fachada monta e entrega ao `Invocador`; cada um guarda o receptor (controlador) e os argumentos. */

export class ComandoCadastrarONG implements Comando<Ong> {
  private readonly argumentos: Parameters<ControladorCadastro['cadastrarONG']>;
  constructor(private readonly controlador: ControladorCadastro, ...argumentos: Parameters<ControladorCadastro['cadastrarONG']>) {
    this.argumentos = argumentos;
  }
  executar(): Ong {
    return this.controlador.cadastrarONG(...this.argumentos);
  }
}

export class ComandoCadastrarVoluntario implements Comando<Voluntario> {
  private readonly argumentos: Parameters<ControladorCadastro['cadastrarVoluntario']>;
  constructor(private readonly controlador: ControladorCadastro, ...argumentos: Parameters<ControladorCadastro['cadastrarVoluntario']>) {
    this.argumentos = argumentos;
  }
  executar(): Voluntario {
    return this.controlador.cadastrarVoluntario(...this.argumentos);
  }
}

export class ComandoAtualizarONG implements Comando<Ong> {
  private readonly argumentos: Parameters<ControladorCadastro['atualizarONG']>;
  constructor(private readonly controlador: ControladorCadastro, ...argumentos: Parameters<ControladorCadastro['atualizarONG']>) {
    this.argumentos = argumentos;
  }
  executar(): Ong {
    return this.controlador.atualizarONG(...this.argumentos);
  }
}

export class ComandoAtualizarVoluntario implements Comando<Voluntario> {
  private readonly argumentos: Parameters<ControladorCadastro['atualizarVoluntario']>;
  constructor(private readonly controlador: ControladorCadastro, ...argumentos: Parameters<ControladorCadastro['atualizarVoluntario']>) {
    this.argumentos = argumentos;
  }
  executar(): Voluntario {
    return this.controlador.atualizarVoluntario(...this.argumentos);
  }
}

export class ComandoRemoverUsuario implements Comando<void> {
  constructor(private readonly controlador: ControladorCadastro, private readonly id: number) {}
  executar(): void {
    this.controlador.removerUsuario(this.id);
  }
}

export class ComandoPublicarVaga implements Comando<Vaga> {
  private readonly argumentos: Parameters<ControladorVagas['publicarVaga']>;
  constructor(private readonly controlador: ControladorVagas, ...argumentos: Parameters<ControladorVagas['publicarVaga']>) {
    this.argumentos = argumentos;
  }
  executar(): Vaga {
    return this.controlador.publicarVaga(...this.argumentos);
  }
}

export class ComandoRemoverVaga implements Comando<void> {
  constructor(private readonly controlador: ControladorVagas, private readonly id: number) {}
  executar(): void {
    this.controlador.removerVaga(this.id);
  }
}

/** Atualiza uma vaga guardando um Memento do estado anterior, para `desfazer()` devolvê-la a esse estado. */
export class ComandoAtualizarVaga implements ComandoDesfazivel<Vaga> {
  private anterior: VagaMemento | undefined;

  constructor(
    private readonly controlador: ControladorVagas,
    private readonly id: number,
    private readonly dados: Parameters<ControladorVagas['atualizarVaga']>[1],
  ) {}

  executar(): Vaga {
    const anterior = this.controlador.buscarVaga(this.id)?.criarMemento();
    const atualizada = this.controlador.atualizarVaga(this.id, this.dados);
    this.anterior = anterior;
    return atualizada;
  }

  desfazer(): void {
    if (!this.anterior) {
      throw new Error('O comando ainda não foi executado.');
    }
    this.controlador.restaurarVaga(this.id, this.anterior);
  }
}

export class ComandoEntrar implements Comando<Omit<Usuario, 'senha'>> {
  constructor(
    private readonly controlador: ControladorAcessos,
    private readonly login: string,
    private readonly senha: string,
  ) {}
  executar(): Omit<Usuario, 'senha'> {
    return this.controlador.entrar(this.login, this.senha);
  }
}

export class ComandoGerarRelatorioAcessos implements Comando<string> {
  constructor(private readonly controlador: ControladorAcessos, private readonly formato: FormatoRelatorio) {}
  executar(): string {
    return this.controlador.gerarRelatorio(this.formato);
  }
}
