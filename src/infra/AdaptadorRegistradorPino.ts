import { destination, pino, type DestinationStream, type Level, type Logger } from 'pino';
import { NivelRegistro, Registrador } from '../entidades/Registrador.js';

const NIVEL_PINO: Record<NivelRegistro, Level> = {
  informacao: 'info',
  aviso: 'warn',
  erro: 'error',
};

const destinoPadrao = (): DestinationStream =>
  destination({ dest: process.env.PONTE_ARQUIVO_LOG ?? 'ponte.log', sync: true, mkdir: true });

/**
 * Adapter: faz a biblioteca pino (`logger.info(contexto, mensagem)`, níveis em inglês)
 * atender à porta `Registrador` (`registrar(nivel, mensagem, contexto)`). Trocar de
 * biblioteca de log muda só esta classe. Por padrão grava em JSON no arquivo
 * `ponte.log` (PONTE_ARQUIVO_LOG), para não misturar o log com a saída da CLI.
 */
export class AdaptadorRegistradorPino implements Registrador {
  private readonly logger: Logger;

  constructor(destino: DestinationStream = destinoPadrao()) {
    this.logger = pino({ base: undefined }, destino);
  }

  registrar(nivel: NivelRegistro, mensagem: string, contexto: Record<string, unknown> = {}): void {
    this.logger[NIVEL_PINO[nivel]](contexto, mensagem);
  }
}
