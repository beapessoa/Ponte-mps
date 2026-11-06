# [UC09] Atualizar Vaga

Permite que a ONG atualize os dados de uma vaga já publicada (data, local, quantidade de vagas e/ou habilidades exigidas).

| Campo | Valor |
|---|---|
| **Ator** | ONG (Coordenadora) |
| **Prioridade** | Importante |
| **Requisitos** | RF11 |
| **Interfaces** | [TL03 — Minhas vagas](../06-interface/README.md#tl03--minhas-vagas), [TL02 — Publicar vaga](../06-interface/README.md#tl02--publicar-vaga) (modo edição) |
| **Status** | Implementado na Sprint 3 — `ControladorVagas.atualizarVaga()` |

**Entradas e pré-condições**
- A vaga já foi publicada pela ONG (UC03).

**Saídas e pós-condições**
- A vaga passa a refletir os novos dados para quem a buscar ou listar (UC04).

## Fluxo principal

1. A coordenadora abre "Minhas vagas" (TL03) e escolhe **Editar** na vaga desejada.
2. O sistema abre o formulário TL02 já preenchido com os dados atuais.
3. A coordenadora altera um ou mais campos (data, local, quantidade de vagas, habilidades exigidas).
4. O sistema valida os campos obrigatórios (RN03).
5. O sistema atualiza a vaga e exibe mensagem de sucesso.

## Fluxos secundários

**FE1 — Campos obrigatórios ausentes ou inválidos (passo 4)**
1. O sistema exibe mensagem de erro e mantém a vaga com os dados anteriores.

**FE2 — Vaga inexistente**
1. O sistema recusa a atualização, informando que a vaga não foi encontrada.
