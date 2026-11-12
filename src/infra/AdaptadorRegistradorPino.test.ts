import { describe, expect, it, vi } from 'vitest';
import { AdaptadorRegistradorPino } from './AdaptadorRegistradorPino.js';

function destinoEmMemoria() {
  const linhas: Record<string, unknown>[] = [];
  return { linhas, write: (linha: string) => linhas.push(JSON.parse(linha)) };
}

describe('AdaptadorRegistradorPino', () => {
  it('deve_traduzir_o_nivel_e_o_contexto_para_o_formato_do_pino', () => {
    const destino = destinoEmMemoria();

    new AdaptadorRegistradorPino(destino).registrar('aviso', 'Tentativa de acesso recusada', { login: 'rafael' });

    expect(destino.linhas).toHaveLength(1);
    expect(destino.linhas[0]).toMatchObject({ level: 40, msg: 'Tentativa de acesso recusada', login: 'rafael' });
  });

  it('deve_mapear_cada_nivel_do_sistema_para_um_nivel_do_pino', () => {
    const destino = destinoEmMemoria();
    const registrador = new AdaptadorRegistradorPino(destino);

    registrador.registrar('informacao', 'a');
    registrador.registrar('aviso', 'b');
    registrador.registrar('erro', 'c');

    expect(destino.linhas.map((linha) => linha.level)).toEqual([30, 40, 50]);
  });

  it('deve_fechar_o_destino_quando_ele_suporta_end', () => {
    const destino = { ...destinoEmMemoria(), end: vi.fn() };

    new AdaptadorRegistradorPino(destino).fechar();

    expect(destino.end).toHaveBeenCalledOnce();
  });

  it('nao_deve_lancar_erro_ao_fechar_um_destino_sem_end', () => {
    const destino = destinoEmMemoria();

    expect(() => new AdaptadorRegistradorPino(destino).fechar()).not.toThrow();
  });
});
