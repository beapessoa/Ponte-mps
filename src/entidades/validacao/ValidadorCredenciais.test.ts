import { describe, expect, it } from 'vitest';
import { LoginInvalidoError, SenhaInvalidaError } from '../erros/ErroDeValidacao.js';
import { validarLogin, validarSenha } from './ValidadorCredenciais.js';

describe('validarLogin', () => {
  it('nao_deve_lancar_erro_para_login_valido', () => {
    expect(() => validarLogin('rafael')).not.toThrow();
  });

  it('deve_lancar_login_invalido_quando_login_e_vazio', () => {
    expect(() => validarLogin('')).toThrow(LoginInvalidoError);
  });

  it('deve_lancar_login_invalido_quando_login_tem_mais_de_12_caracteres', () => {
    expect(() => validarLogin('umLoginComMuitosCaracteres')).toThrow(LoginInvalidoError);
  });

  it('deve_lancar_login_invalido_quando_login_contem_numeros', () => {
    expect(() => validarLogin('rafael1')).toThrow(LoginInvalidoError);
  });
});

describe('validarSenha', () => {
  it('nao_deve_lancar_erro_para_senha_valida', () => {
    expect(() => validarSenha('Abcdef@1', 'rafael')).not.toThrow();
  });

  it('deve_lancar_senha_invalida_quando_senha_tem_menos_de_8_caracteres', () => {
    expect(() => validarSenha('Ab@1', 'rafael')).toThrow(SenhaInvalidaError);
  });

  it('deve_lancar_senha_invalida_quando_senha_tem_menos_de_3_tipos_de_caractere', () => {
    expect(() => validarSenha('abcdefgh', 'rafael')).toThrow(SenhaInvalidaError);
  });

  it('deve_lancar_senha_invalida_quando_senha_e_igual_ao_login', () => {
    // 'Abcdef@gh' por si só atende tamanho e tipos de caractere, isolando a regra testada.
    expect(() => validarSenha('Abcdef@gh', 'Abcdef@gh')).toThrow(SenhaInvalidaError);
  });
});
