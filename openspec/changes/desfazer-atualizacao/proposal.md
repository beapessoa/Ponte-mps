# Proposta: desfazer-atualizacao

## Why

A Sprint 5 pede desfazer a última atualização da entidade principal. No Ponte, a entidade principal é a **Vaga**: a coordenadora da ONG pode errar a data, o local ou a quantidade ao editar uma vaga já publicada, e hoje a única saída é reeditar tudo à mão, lembrando os valores antigos. Desfazer devolve a vaga ao estado anterior com um passo.

## What Changes

- Novo requisito **RF17 — Desfazer Atualização de Vaga**: o sistema devolve a vaga ao estado em que estava antes da última atualização bem-sucedida.
- A fachada passa a executar suas operações como **comandos** (Command), e a atualização de vaga guarda um **retrato do estado anterior** (Memento) para poder ser desfeita.
- A CLI ganha a opção 12.

**Fora do escopo:** desfazer em vários níveis, refazer (redo), desfazer a criação, a remoção ou a atualização de usuários, histórico de alterações com data e autor, e permissão (quem pode desfazer). O desfazer vale para a execução atual do programa: não é gravado em arquivo.

## Capabilities

### New Capabilities
- (nenhuma)

### Modified Capabilities
- `vagas`: novo requisito RF17 (desfazer a última atualização de uma vaga)

## Impact

- Novas classes `Comando`, `ComandoDesfazivel`, `Invocador`, dez comandos da fachada (`ComandosFachada.ts`), `VagaMemento` e `NadaParaDesfazerError`.
- `Vaga` ganha `criarMemento()` e `restaurar()`; `ControladorVagas` ganha `restaurarVaga()`.
- `FacadeSingletonController` passa a delegar ao `Invocador` e ganha `desfazerUltimaAtualizacaoDeVaga()`. Ver [ADR-0005](../../../docs/07-arquitetura/adr/0005-facade-baseada-em-command.md) e [ADR-0006](../../../docs/07-arquitetura/adr/0006-memento-desfazer-atualizacao-de-vaga.md).
