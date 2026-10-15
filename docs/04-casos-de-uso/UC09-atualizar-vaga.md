# [UC09] Atualizar Vaga

Permite que a ONG atualize os dados de uma vaga já publicada (data, local, quantidade de vagas e/ou habilidades exigidas).

| Campo | Valor |
|---|---|
| **Ator** | ONG (Coordenadora) |
| **Prioridade** | Importante |
| **Requisitos** | RF11 |
| **Interfaces** | — (pendente, UI ainda não definida) |
| **Status** | Implementado na Sprint 3 — `ControladorVagas.atualizarVaga()` |

**Entradas e pré-condições**
- A vaga já foi publicada pela ONG (UC03).

**Saídas e pós-condições**
- A vaga passa a refletir os novos dados para quem a buscar ou listar (UC04).

## Fluxo principal

1. A coordenadora acessa a vaga já publicada.
2. A coordenadora altera um ou mais campos (data, local, quantidade de vagas, habilidades exigidas).
3. O sistema valida os campos obrigatórios (RN03).
4. O sistema atualiza a vaga e exibe mensagem de sucesso.

## Fluxos secundários

**FE1 — Campos obrigatórios ausentes ou inválidos (passo 3)**
1. O sistema exibe mensagem de erro e mantém a vaga com os dados anteriores.

**FE2 — Vaga inexistente**
1. O sistema recusa a atualização, informando que a vaga não foi encontrada.
