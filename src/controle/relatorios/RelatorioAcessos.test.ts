import { describe, expect, it } from 'vitest';
import { Acesso } from '../../entidades/Acesso.js';
import { Ong } from '../../entidades/Ong.js';
import { Voluntario } from '../../entidades/Voluntario.js';
import { RelatorioAcessosCSV } from './RelatorioAcessosCSV.js';
import { RelatorioAcessosHTML } from './RelatorioAcessosHTML.js';

const SENHA = 'Abcdef@1';
const GERADO_EM = new Date('2026-11-11T20:00:00Z');

function cenario() {
  const ong = new Ong('Amigos <do> Bairro', 'amigos', SENHA, 'Saúde', 'Ações de saúde.');
  ong.id = 1;
  const voluntario = new Voluntario('Rafael, o "Rafa"', 'rafael', SENHA, ['enfermagem'], 'manhãs', 'João Pessoa/PB');
  voluntario.id = 2;
  const acessos = [
    new Acesso(2, new Date('2026-11-10T09:00:00Z')),
    new Acesso(2, new Date('2026-11-11T09:00:00Z')),
  ];
  return { usuarios: [ong, voluntario], acessos };
}

describe('RelatorioAcessosCSV', () => {
  it('deve_listar_usuarios_por_quantidade_de_acessos_com_total', () => {
    const { usuarios, acessos } = cenario();

    expect(new RelatorioAcessosCSV().gerar(usuarios, acessos, GERADO_EM).split('\n')).toEqual([
      'nome,login,tipo,acessos,ultimo_acesso',
      '"Rafael, o ""Rafa""",rafael,Voluntário,2,2026-11-11T09:00:00.000Z',
      'Amigos <do> Bairro,amigos,ONG,0,',
      'TOTAL,,,2,',
    ]);
  });

  it('deve_neutralizar_nome_que_comeca_com_caractere_de_formula', () => {
    const ong = new Ong('=HYPERLINK("http://evil","clique")', 'evil', SENHA, 'Saúde', 'Ações de saúde.');
    ong.id = 1;

    const linha = new RelatorioAcessosCSV().gerar([ong], [], GERADO_EM).split('\n')[1];

    expect(linha.startsWith('"\'=HYPERLINK')).toBe(true);
  });

  it('deve_colocar_entre_aspas_um_campo_com_cr_solto', () => {
    const ong = new Ong('Amigos\rdo Bairro', 'amigos', SENHA, 'Saúde', 'Ações de saúde.');
    ong.id = 1;

    const linha = new RelatorioAcessosCSV().gerar([ong], [], GERADO_EM).split('\n')[1];

    expect(linha.startsWith('"Amigos\rdo Bairro"')).toBe(true);
  });
});

describe('RelatorioAcessosHTML', () => {
  it('deve_gerar_uma_tabela_com_os_mesmos_dados_e_o_total', () => {
    const { usuarios, acessos } = cenario();

    const html = new RelatorioAcessosHTML().gerar(usuarios, acessos, GERADO_EM);

    expect(html).toMatch(/^<!doctype html>/);
    expect(html).toContain('Gerado em 2026-11-11T20:00:00.000Z');
    expect(html).toContain('<td>rafael</td><td>Voluntário</td><td>2</td><td>2026-11-11T09:00:00.000Z</td>');
    expect(html).toContain('<td>amigos</td><td>ONG</td><td>0</td><td>—</td>');
    expect(html).toContain('Total: 2 acessos de 2 usuários.');
  });

  it('deve_escapar_html_nos_dados_do_usuario', () => {
    const { usuarios, acessos } = cenario();

    const html = new RelatorioAcessosHTML().gerar(usuarios, acessos, GERADO_EM);

    expect(html).toContain('Amigos &lt;do&gt; Bairro');
    expect(html).not.toContain('<do>');
  });
});
