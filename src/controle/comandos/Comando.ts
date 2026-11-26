import { NadaParaDesfazerError } from '../../entidades/erros/NadaParaDesfazerError.js';

/** Command: uma operação do sistema encapsulada como objeto, com seus argumentos já guardados. */
export interface Comando<R> {
  executar(): R;
}

/** Comando que também sabe desfazer o próprio efeito. */
export interface ComandoDesfazivel<R> extends Comando<R> {
  desfazer(): void;
}

function ehDesfazivel<R>(comando: Comando<R>): comando is ComandoDesfazivel<R> {
  return 'desfazer' in comando;
}

/**
 * Invoker do Command e Caretaker do Memento: executa os comandos e guarda só o
 * último desfazível, para o sistema poder desfazer a última atualização.
 */
export class Invocador {
  private ultimoDesfazivel: ComandoDesfazivel<unknown> | undefined;

  executar<R>(comando: Comando<R>): R {
    const resultado = comando.executar();
    if (ehDesfazivel(comando)) {
      this.ultimoDesfazivel = comando;
    }
    return resultado;
  }

  /** Desfaz o último comando desfazível; falha sem perder o comando guardado, e só um nível é lembrado. */
  desfazerUltimo(): void {
    if (!this.ultimoDesfazivel) {
      throw new NadaParaDesfazerError();
    }
    this.ultimoDesfazivel.desfazer();
    this.ultimoDesfazivel = undefined;
  }
}
