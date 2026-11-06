# Tasks

## 1. Documentação

- [x] 1.1 Descrever UC03, UC09 e UC10 (`docs/04-casos-de-uso/`)
- [x] 1.2 Wireframes TL02 e TL03 (`docs/06-interface/README.md`)
- [x] 1.3 Atualizar os diagramas de análise e de projeto com Vaga e a fachada (`docs/05-analise.md`, `docs/08-projeto.md`)
- [x] 1.4 Registrar o ADR-0002 (fachada única com Facade + Singleton)

## 2. Implementação

- [x] 2.1 Entidade `Vaga`, porta `RepositorioVagas` e adaptador `RepositorioVagasRAM`
- [x] 2.2 `ControladorVagas` com publicar, buscar, listar, atualizar e remover, com um teste por cenário
- [x] 2.3 Exigir que `ongId` pertença a uma ONG cadastrada (cenário "Publicador não é uma ONG cadastrada")
- [x] 2.4 `FacadeSingletonController` com `contarEntidadesCadastradas()` e `inicializar(tipo)`
- [x] 2.5 Expor o CRUD na CLI (`src/fronteira/cli.ts`)

## 3. Verificação

- [x] 3.1 Conferir o delta contra as regras de `openspec/config.yaml` (cabeçalhos RFnn, "DEVE", metadados e cenários GIVEN/WHEN/THEN)
- [x] 3.2 `npm test` verde (87 testes)
