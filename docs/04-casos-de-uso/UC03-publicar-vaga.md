# [UC03] Publicar Vaga

Permite que a ONG publique uma ação voluntária informando data, local, número de vagas e habilidades exigidas.

| Campo | Valor |
|---|---|
| **Ator** | ONG (Coordenadora) |
| **Prioridade** | Essencial |
| **Requisitos** | RF03, NF-USA-01 |
| **Interfaces** | — (pendente, UI ainda não definida) |
| **Status** | Não implementado |

**Entradas e pré-condições**
- A ONG possui cadastro ativo (UC01).

**Saídas e pós-condições**
- A vaga fica disponível para voluntários buscarem manualmente ou receberem como sugestão (Match).

## Fluxo principal

1. A coordenadora acessa "Publicar Vaga" no painel da ONG.
2. O sistema exibe formulário simplificado (data, local, nº de vagas, habilidades exigidas, descrição da ação), em linha com NF-USA-01.
3. A coordenadora preenche os campos e confirma.
4. O sistema valida os dados obrigatórios (RN03).
5. O sistema publica a vaga, tornando-a visível para busca e sugestão automática.

## Fluxos secundários

**FE1 — Campos obrigatórios ausentes (passo 4)**
1. O sistema exibe erro e mantém o formulário preenchido para correção.
