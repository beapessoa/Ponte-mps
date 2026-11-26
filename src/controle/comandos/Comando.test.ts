import { describe, expect, it } from 'vitest';
import { NadaParaDesfazerError } from '../../entidades/erros/NadaParaDesfazerError.js';
import { Comando, ComandoDesfazivel, Invocador } from './Comando.js';

class Contador implements ComandoDesfazivel<number> {
  desfeitos = 0;
  constructor(private readonly valor: number) {}
  executar(): number {
    return this.valor;
  }
  desfazer(): void {
    this.desfeitos++;
  }
}

describe('Invocador', () => {
  it('deve_executar_o_comando_e_devolver_o_resultado', () => {
    const comando: Comando<string> = { executar: () => 'ok' };

    expect(new Invocador().executar(comando)).toBe('ok');
  });

  it('deve_desfazer_apenas_o_ultimo_comando_desfazivel', () => {
    const invocador = new Invocador();
    const primeiro = new Contador(1);
    const segundo = new Contador(2);
    invocador.executar(primeiro);
    invocador.executar(segundo);

    invocador.desfazerUltimo();

    expect(segundo.desfeitos).toBe(1);
    expect(primeiro.desfeitos).toBe(0);
  });

  it('deve_ignorar_comandos_que_nao_desfazem_ao_guardar_o_ultimo', () => {
    const invocador = new Invocador();
    const desfazivel = new Contador(1);
    invocador.executar(desfazivel);
    invocador.executar({ executar: () => 'consulta' });

    invocador.desfazerUltimo();

    expect(desfazivel.desfeitos).toBe(1);
  });

  it('deve_lancar_erro_ao_desfazer_sem_nada_guardado', () => {
    expect(() => new Invocador().desfazerUltimo()).toThrow(NadaParaDesfazerError);
  });

  it('deve_lancar_erro_ao_desfazer_duas_vezes_seguidas', () => {
    const invocador = new Invocador();
    invocador.executar(new Contador(1));
    invocador.desfazerUltimo();

    expect(() => invocador.desfazerUltimo()).toThrow(NadaParaDesfazerError);
  });

  it('deve_manter_o_ultimo_comando_se_executar_falhar', () => {
    const invocador = new Invocador();
    const desfazivel = new Contador(1);
    invocador.executar(desfazivel);

    expect(() => invocador.executar({ executar: () => { throw new Error('falhou'); } })).toThrow('falhou');
    invocador.desfazerUltimo();

    expect(desfazivel.desfeitos).toBe(1);
  });
});
