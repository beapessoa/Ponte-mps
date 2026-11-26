# Tasks

## 1. Documentação

- [x] 1.1 Delta da spec `vagas` com RF17 e seus cenários
- [x] 1.2 ADR-0005 (fachada baseada em Command) e ADR-0006 (Memento)
- [x] 1.3 UC15 e atualização do diagrama de classes de projeto e da tabela de padrões (`docs/08-projeto.md`)

## 2. Implementação

- [x] 2.1 `Comando`, `ComandoDesfazivel` e `Invocador`
- [x] 2.2 Comandos da fachada (`ComandosFachada.ts`) e `FacadeSingletonController` delegando ao `Invocador`
- [x] 2.3 `VagaMemento`, `Vaga.criarMemento()`/`restaurar()`, `ControladorVagas.restaurarVaga()` e `ComandoAtualizarVaga`
- [x] 2.4 `NadaParaDesfazerError`, `desfazerUltimaAtualizacaoDeVaga()` na fachada e opção 12 da CLI

## 3. Verificação

- [x] 3.1 `npm test` verde e `npm run typecheck` sem erros
- [x] 3.2 CLI testada de ponta a ponta com persistência em arquivo: atualizar vaga, desfazer, tentar desfazer de novo
