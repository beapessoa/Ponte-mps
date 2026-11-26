# Design: desfazer-atualizacao

## Context

A Sprint 5 pede dois padrões: a fachada da camada de negócio baseada em Command e um Memento para desfazer a última atualização da entidade principal (Vaga). Os dois se encaixam: o comando de atualização é quem sabe desfazer, e o Memento é o retrato do estado que ele guarda.

## Goals / Non-Goals

**Goals:**
- Desfazer a última atualização de vaga sem que o controlador precise saber como (a fachada só pede ao invocador).
- Cada operação da fachada virar um objeto que dá para executar, e, quando fizer sentido, desfazer.

**Non-Goals:**
- Várias camadas de desfazer, refazer, histórico persistido, desfazer de usuários.

## Decisions

- **Command:** a interface `Comando<R>` tem `executar()`; `ComandoDesfazivel<R>` acrescenta `desfazer()`. Os dez comandos de `ComandosFachada.ts` guardam o receptor (um controlador) e os argumentos. Consultas (`listarUsuarios`, `buscarVaga`, `listarVagas`, `contarEntidadesCadastradas`) ficam fora: não mudam estado e não têm o que desfazer. Ver [ADR-0005](../../../docs/07-arquitetura/adr/0005-facade-baseada-em-command.md).
- **Memento:** `VagaMemento` é uma cópia imutável de data, local, quantidade e habilidades. `Vaga` (originator) cria o memento e se restaura a partir dele; `ComandoAtualizarVaga` o guarda entre `executar()` e `desfazer()`. A cópia das habilidades evita que uma alteração posterior na lista altere o retrato. Ver [ADR-0006](../../../docs/07-arquitetura/adr/0006-memento-desfazer-atualizacao-de-vaga.md).
- **`Invocador` guarda só o último comando desfazível** (um nível), e esquece o comando depois de desfazer. Ele é o *caretaker* do Memento.
- **O memento é tirado antes de atualizar e só fica guardado se a atualização der certo:** um pedido recusado por validação não vira "última atualização".
- **`restaurarVaga` está em `ControladorVagas`**, e não no comando, para o comando não acessar o repositório diretamente.

## Risks / Trade-offs

- O desfazer vale só enquanto o programa está aberto: ao reiniciar, o `Invocador` volta vazio. Gravar o histórico exigiria persistir mementos.
- Se outra pessoa alterar a mesma vaga entre a atualização e o desfazer (hoje impossível: a CLI é de um usuário só), o desfazer sobrescreveria essa alteração. Com várias sessões seria preciso comparar versões.
- Desfazer não cobre a remoção: uma vaga removida não volta.
