import { describe, expect, it } from 'vitest';
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
});
