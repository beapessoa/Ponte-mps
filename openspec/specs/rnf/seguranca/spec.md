# rnf/seguranca Specification

## Purpose
Requisitos não funcionais de proteção e privacidade de dados pessoais.

## Requirements

### Requirement: NF-SEG-01 — Privacidade e Proteção de Dados (LGPD)
Para cada dado pessoal coletado (contato e saúde do voluntário, dados da ONG), o sistema DEVE satisfazer, de forma verificável, os seguintes controles da LGPD (RN10):
- registrar a **finalidade declarada** de cada dado coletado;
- exigir **consentimento explícito** do titular no cadastro (opt-in, caixa não pré-marcada);
- permitir que o titular **exporte todos os seus dados** em formato legível a qualquer momento (direito de acesso — art. 18, II);
- permitir que o titular **exclua sua conta e todos os seus dados pessoais em até 15 dias** do pedido (direito de eliminação — art. 18, VI).

**Prioridade:** Essencial
**Casos de uso:** UC01, UC02, UC07
**Métrica (checagem binária):** finalidade registrada por dado · consentimento opt-in · exportação disponível · exclusão concluída ≤ 15 dias

#### Scenario: Consentimento explícito no cadastro
- **GIVEN** um novo voluntário preenchendo o cadastro
- **WHEN** ele tenta concluir sem marcar o consentimento de tratamento de dados
- **THEN** o sistema não conclui o cadastro até o consentimento ser dado explicitamente

#### Scenario: Titular exerce o direito de eliminação
- **GIVEN** um voluntário com dados de contato e de saúde cadastrados
- **WHEN** ele solicita a exclusão da sua conta
- **THEN** o sistema remove todos os seus dados pessoais em até 15 dias e confirma a eliminação

### Requirement: NF-SEG-02 — Senha Nunca Exibida
O sistema DEVE garantir que a senha de um usuário nunca seja retornada em nenhuma consulta, listagem, log ou mensagem de erro — nem em texto plano, nem de qualquer outra forma recuperável.

**Prioridade:** Essencial
**Casos de uso:** UC08
**Status:** Implementado — `ControladorListagem.listarUsuarios()` usa `omitirSenha()` para remover o campo `senha` antes de retornar (ver [`src/controle/ControladorListagem.ts`](../../../src/controle/ControladorListagem.ts) e [`src/entidades/Usuario.ts`](../../../src/entidades/Usuario.ts)).

#### Scenario: Listagem sem senha
- **GIVEN** existem usuários cadastrados com login e senha
- **WHEN** alguém solicita a listagem de usuários
- **THEN** o sistema retorna nome, login e papel de cada usuário, sem o campo de senha
