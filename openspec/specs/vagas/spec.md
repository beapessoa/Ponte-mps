# vagas Specification

## Purpose
Publicação, consulta, atualização e remoção de ações (vagas) de voluntariado pelas ONGs.

## Requirements

### Requirement: RF03 — Publicação de Vagas
O sistema DEVE permitir que a ONG publique uma ação informando data, local, quantidade de pessoas necessárias e habilidades exigidas, para atrair o voluntariado adequado.

**Regra de negócio:** uma vaga não pode ser publicada sem data, local, número de vagas e habilidades exigidas (RN03).
**Prioridade:** Essencial
**Casos de uso:** UC03
**Status:** Implementado na Sprint 3 — `ControladorVagas.publicarVaga()`, vinculada à ONG por `ongId`

#### Scenario: Publicação válida
- **GIVEN** uma ONG com cadastro ativo
- **WHEN** ela publica uma vaga com data, local, quantidade de vagas e habilidades exigidas preenchidos
- **THEN** a vaga é armazenada e associada à ONG, com um ID atribuído

#### Scenario: Campo obrigatório ausente ou inválido
- **GIVEN** uma ONG tenta publicar uma vaga
- **WHEN** faltam data, local, uma quantidade de vagas maior que zero, ou habilidades exigidas
- **THEN** o sistema recusa a publicação sem criar a vaga

### Requirement: RF11 — Atualizar Vaga
O sistema DEVE permitir que a ONG atualize data, local, quantidade de vagas e/ou habilidades exigidas de uma vaga já publicada, respeitando as mesmas regras de preenchimento obrigatório da publicação (RN03).

**Prioridade:** Importante
**Casos de uso:** UC09
**Status:** Implementado na Sprint 3 — `ControladorVagas.atualizarVaga()`

#### Scenario: Atualização válida
- **GIVEN** uma vaga publicada com 5 posições
- **WHEN** a ONG atualiza a quantidade de vagas para 8
- **THEN** a vaga passa a ter 8 posições, mantendo os demais campos

#### Scenario: Vaga inexistente
- **GIVEN** não existe vaga com o ID informado
- **WHEN** a ONG tenta atualizá-la
- **THEN** o sistema recusa a atualização

### Requirement: RF12 — Remover Vaga
O sistema DEVE permitir que a ONG remova uma vaga publicada por ela.

**Prioridade:** Importante
**Casos de uso:** UC10
**Status:** Implementado na Sprint 3 — `ControladorVagas.removerVaga()`

#### Scenario: Remoção válida
- **GIVEN** uma vaga publicada pela ONG
- **WHEN** a ONG a remove
- **THEN** a vaga deixa de aparecer na busca e na listagem de vagas

#### Scenario: Vaga inexistente
- **GIVEN** não existe vaga com o ID informado
- **WHEN** a ONG tenta removê-la
- **THEN** o sistema recusa a remoção
