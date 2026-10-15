# rnf/confiabilidade Specification

## Purpose
Requisitos não funcionais de integridade e consistência das regras de negócio do fluxo de participação.

## Requirements

### Requirement: NF-CON-01 — Integridade do Fluxo de Inscrição e Avaliação
O sistema DEVE garantir a consistência das regras de negócio do fluxo de participação — por exemplo, não permitir aprovações além do número de vagas e liberar a avaliação mútua apenas após a realização da ação —, preservando a integridade dos dados de inscrições, aprovações e avaliações.

**Prioridade:** Importante
**Casos de uso:** UC05, UC06, UC07

#### Scenario: Limite de aprovações respeitado
- **GIVEN** uma vaga com 2 posições e 2 inscrições já aprovadas
- **WHEN** a ONG tenta aprovar uma terceira inscrição
- **THEN** o sistema recusa a aprovação e mantém a vaga com apenas 2 aprovados

### Requirement: NF-CON-02 — Tratamento de Falhas de Armazenamento
O sistema DEVE capturar falhas de leitura ou escrita do mecanismo de persistência e convertê-las numa exceção de negócio (`ErroDePersistencia` ou subclasse), nunca propagando a exceção nativa de E/S ao chamador.

**Prioridade:** Essencial
**Status:** Implementado na Sprint 2 — ver `RepositorioUsuariosArquivo` em [`docs/specs/tratamento-erros-persistencia.md`](../../../docs/specs/tratamento-erros-persistencia.md)

#### Scenario: Falha ao gravar o arquivo
- **GIVEN** o arquivo de persistência está inacessível (por exemplo, sem permissão de escrita)
- **WHEN** o sistema tenta salvar um usuário
- **THEN** o sistema lança `ErroDeArquivo` com a causa original, em vez de propagar a exceção nativa do sistema de arquivos
