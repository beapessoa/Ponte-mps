# rnf/seguranca Specification

## Purpose
Requisitos não funcionais de proteção e privacidade de dados pessoais.

## Requirements

### Requirement: NF-SEG-01 — Privacidade e Proteção de Dados
O sistema DEVE proteger os dados pessoais de saúde e de contato dos voluntários, bem como os dados organizacionais das ONGs, em conformidade com a LGPD (RN10).

**Prioridade:** Essencial
**Casos de uso:** UC01, UC02, UC07

#### Scenario: Dados pessoais tratados conforme a LGPD
- **GIVEN** um voluntário cadastra dados pessoais de contato e de saúde
- **WHEN** esses dados são armazenados pelo sistema
- **THEN** o acesso a eles respeita a LGPD (coleta, uso e retenção com finalidade declarada)

### Requirement: NF-SEG-02 — Senha Nunca Exibida
O sistema DEVE garantir que a senha de um usuário nunca seja retornada em nenhuma consulta, listagem, log ou mensagem de erro — nem em texto plano, nem de qualquer outra forma recuperável.

**Prioridade:** Essencial
**Casos de uso:** UC08
**Status:** Não implementado — `ControladorListagem.listarUsuarios()` hoje retorna o objeto `Usuario` completo, incluindo `senha` em texto plano (ver [`src/controle/ControladorListagem.ts`](../../../src/controle/ControladorListagem.ts) e [`src/entidades/Usuario.ts`](../../../src/entidades/Usuario.ts)).

#### Scenario: Listagem sem senha
- **GIVEN** existem usuários cadastrados com login e senha
- **WHEN** alguém solicita a listagem de usuários
- **THEN** o sistema retorna nome, login e papel de cada usuário, sem o campo de senha
