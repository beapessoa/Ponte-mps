# Spec Delta — acessos

## ADDED Requirements

### Requirement: RF15 — Entrar no Sistema
O sistema DEVE permitir que um usuário cadastrado (ONG ou voluntário) entre informando login e senha, e DEVE registrar cada entrada bem-sucedida como um acesso, com o usuário e a data e hora.

**Prioridade:** Importante
**Casos de uso:** UC13
**Regra de negócio:** a mensagem de recusa não informa se o erro foi no login ou na senha; a senha nunca aparece no log.
**Status:** Implementado na Sprint 4 — `ControladorAcessos.entrar()`

#### Scenario: Entrada válida
- **GIVEN** um voluntário cadastrado com login "rafael"
- **WHEN** ele entra com o login e a senha corretos
- **THEN** o sistema registra um acesso dele com a data e hora atuais e devolve seus dados sem a senha

#### Scenario: Credenciais inválidas
- **GIVEN** um voluntário cadastrado com login "rafael"
- **WHEN** alguém tenta entrar com esse login e uma senha errada, ou com um login inexistente
- **THEN** o sistema recusa com "Login ou senha inválidos.", não registra acesso e grava a tentativa no log sem a senha

### Requirement: RF16 — Relatório de Acessos
O sistema DEVE gerar um relatório de estatísticas de acesso dos usuários em HTML ou em CSV, à escolha de quem pede, com o mesmo conteúdo nos dois formatos: para cada usuário, nome, login, tipo (ONG ou Voluntário), quantidade de acessos e data e hora do último acesso, e ao final o total de acessos.

**Prioridade:** Importante
**Casos de uso:** UC14
**Regra de negócio:** usuários sem nenhum acesso aparecem com 0 e sem último acesso; a lista vem do mais acessado para o menos acessado (empate por login). Acessos de usuários já removidos não entram no relatório.
**Status:** Implementado na Sprint 4 — `ControladorAcessos.gerarRelatorio()` com `RelatorioAcessosHTML` e `RelatorioAcessosCSV`

#### Scenario: Relatório em CSV
- **GIVEN** uma ONG sem acessos e um voluntário com 2 acessos, o último em 11/11/2026 às 09:00 UTC
- **WHEN** o relatório é pedido em CSV
- **THEN** o sistema gera o cabeçalho, uma linha do voluntário com 2 acessos e último acesso `2026-11-11T09:00:00.000Z`, depois a linha da ONG com 0, e a linha de total com 2

#### Scenario: Relatório em HTML
- **GIVEN** os mesmos usuários e acessos
- **WHEN** o relatório é pedido em HTML
- **THEN** o sistema gera uma página com uma tabela de 2 linhas de usuário com os mesmos dados do CSV e o texto "Total: 2 acessos de 2 usuários."

#### Scenario: Dados com caracteres especiais
- **GIVEN** uma ONG cujo nome contém `<` e `>`, ou um voluntário cujo nome contém vírgula e aspas
- **WHEN** o relatório é gerado
- **THEN** o HTML exibe o nome escapado (sem criar tags) e o CSV coloca o campo entre aspas, sem quebrar as colunas

#### Scenario: Formato não suportado
- **GIVEN** qualquer estado do sistema
- **WHEN** o relatório é pedido num formato diferente de HTML ou CSV
- **THEN** o sistema recusa informando que o formato é desconhecido
