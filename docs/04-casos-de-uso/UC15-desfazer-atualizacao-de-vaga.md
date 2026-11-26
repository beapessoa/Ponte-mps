# [UC15] Desfazer Atualização de Vaga

Permite que a ONG desfaça a última atualização feita em uma vaga, devolvendo-a ao estado anterior.

| Campo | Valor |
|---|---|
| **Ator** | ONG (Coordenadora) |
| **Prioridade** | Importante |
| **Requisitos** | RF17 |
| **Interfaces** | CLI, opção 12 (tela web pendente) |
| **Status** | Implementado na Sprint 5 — `FacadeSingletonController.desfazerUltimaAtualizacaoDeVaga()` |

**Entradas e pré-condições**
- Uma vaga foi atualizada (UC09) nesta execução do sistema, e essa atualização ainda não foi desfeita.

**Saídas e pós-condições**
- A vaga volta a ter data, local, quantidade de vagas e habilidades exigidas de antes da atualização.
- Não há mais nada para desfazer até a próxima atualização.

## Fluxo principal

1. A coordenadora escolhe **Desfazer última atualização**.
2. O sistema localiza a última atualização de vaga bem-sucedida.
3. O sistema devolve a vaga aos valores anteriores e informa que a atualização foi desfeita.

## Fluxos secundários

**FE1 — Nada para desfazer (passo 2)**
1. O sistema recusa com "Não há atualização para desfazer.". Isso acontece se nenhuma vaga foi atualizada, se a última atualização já foi desfeita ou se o sistema foi reiniciado.

**FE2 — Vaga removida (passo 3)**
1. O sistema recusa informando que a vaga não foi encontrada.
