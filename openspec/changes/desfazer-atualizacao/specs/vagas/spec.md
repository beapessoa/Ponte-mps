# Spec Delta — vagas

## ADDED Requirements

### Requirement: RF17 — Desfazer Atualização de Vaga
O sistema DEVE permitir desfazer a última atualização de vaga, devolvendo data, local, quantidade de vagas e habilidades exigidas aos valores que tinham antes dessa atualização.

**Regra de negócio:** só a última atualização bem-sucedida pode ser desfeita, uma única vez; atualizações recusadas por dados inválidos não contam.
**Prioridade:** Importante
**Casos de uso:** UC15
**Status:** Implementado na Sprint 5 — `FacadeSingletonController.desfazerUltimaAtualizacaoDeVaga()` com `ComandoAtualizarVaga` e `VagaMemento`

#### Scenario: Desfazer a última atualização
- **GIVEN** uma vaga publicada com 5 posições, atualizada depois para 9 posições
- **WHEN** a coordenadora pede para desfazer a última atualização
- **THEN** a vaga volta a ter 5 posições e os demais campos continuam como estavam antes da atualização

#### Scenario: Só a última de várias atualizações é desfeita
- **GIVEN** uma vaga atualizada para 8 posições e, em seguida, para 12
- **WHEN** a coordenadora desfaz a última atualização
- **THEN** a vaga fica com 8 posições, e um segundo pedido de desfazer é recusado

#### Scenario: Nada para desfazer
- **GIVEN** nenhuma vaga foi atualizada, ou a última atualização já foi desfeita
- **WHEN** a coordenadora pede para desfazer
- **THEN** o sistema recusa com "Não há atualização para desfazer." e não altera nenhuma vaga

#### Scenario: Atualização recusada não é guardada
- **GIVEN** uma tentativa de atualizar a vaga com o local em branco foi recusada
- **WHEN** a coordenadora pede para desfazer
- **THEN** o sistema recusa com "Não há atualização para desfazer."

#### Scenario: Vaga removida depois da atualização
- **GIVEN** uma vaga foi atualizada e depois removida
- **WHEN** a coordenadora pede para desfazer
- **THEN** o sistema recusa informando que a vaga não foi encontrada
