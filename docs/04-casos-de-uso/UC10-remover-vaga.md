# [UC10] Remover Vaga

Permite que a ONG remova uma vaga que publicou.

| Campo | Valor |
|---|---|
| **Ator** | ONG (Coordenadora) |
| **Prioridade** | Importante |
| **Requisitos** | RF12 |
| **Interfaces** | — (pendente, UI ainda não definida) |
| **Status** | Implementado na Sprint 3 — `ControladorVagas.removerVaga()` |

**Entradas e pré-condições**
- A vaga já foi publicada pela ONG (UC03).

**Saídas e pós-condições**
- A vaga deixa de aparecer na busca (UC04) e na listagem da ONG.

## Fluxo principal

1. A coordenadora acessa a vaga já publicada.
2. A coordenadora confirma a remoção.
3. O sistema remove a vaga e exibe mensagem de sucesso.

## Fluxos secundários

**FE1 — Vaga inexistente**
1. O sistema recusa a remoção, informando que a vaga não foi encontrada.
