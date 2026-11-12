export type NivelRegistro = 'informacao' | 'aviso' | 'erro';

/**
 * Porta de log do sistema. As camadas de negócio registram eventos por aqui, sem
 * conhecer a biblioteca de log usada em `infra` (ver ADR-0004).
 */
export interface Registrador {
  registrar(nivel: NivelRegistro, mensagem: string, contexto?: Record<string, unknown>): void;
  /** Libera os recursos do destino de log (ex.: arquivo aberto). Chamado ao descartar a fachada. */
  fechar(): void;
}
