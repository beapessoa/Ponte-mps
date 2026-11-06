# [UC03] Publicar Vaga

Permite que a ONG publique uma ação voluntária informando data, local, número de vagas e habilidades exigidas.

| Campo | Valor |
|---|---|
| **Ator** | ONG (Coordenadora) |
| **Prioridade** | Essencial |
| **Requisitos** | RF03, NF-USA-01 |
| **Interfaces** | [TL02 — Publicar vaga](../06-interface/README.md#tl02--publicar-vaga), [TL03 — Minhas vagas](../06-interface/README.md#tl03--minhas-vagas) |
| **Status** | Implementado na Sprint 3 — `ControladorVagas.publicarVaga()`, via `FacadeSingletonController.publicarVaga()` |

**Entradas e pré-condições**
- A ONG possui cadastro ativo (UC01): o `ongId` informado precisa pertencer a uma ONG cadastrada.

**Saídas e pós-condições**
- A vaga fica disponível para voluntários buscarem manualmente ou receberem como sugestão (Match).

## Fluxo principal

1. A coordenadora acessa "Publicar Vaga" no painel da ONG.
2. O sistema exibe formulário simplificado (data, local, nº de vagas, habilidades exigidas), em linha com NF-USA-01.
3. A coordenadora preenche os campos e confirma.
4. O sistema valida os dados obrigatórios (RN03).
5. O sistema publica a vaga vinculada à ONG, atribui um ID e a exibe em "Minhas vagas" (TL03), tornando-a visível para busca e sugestão automática.

## Fluxos secundários

**FE1 — Campos obrigatórios ausentes ou inválidos (passo 4)**
1. Falta data, local ou habilidades exigidas, ou a quantidade de vagas não é maior que zero.
2. O sistema exibe erro, não cria a vaga e mantém o formulário preenchido para correção.

**FE2 — Publicador não é uma ONG cadastrada (passo 4)**
1. O `ongId` não existe ou pertence a um voluntário.
2. O sistema recusa a publicação com a mensagem "ONG não encontrada" e não cria a vaga.
