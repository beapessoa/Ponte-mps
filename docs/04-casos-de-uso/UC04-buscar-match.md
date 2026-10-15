# [UC04] Buscar e Receber Sugestão de Vagas (Match)

O sistema sugere automaticamente vagas compatíveis com o perfil do voluntário e permite também a busca manual por filtros.

| Campo | Valor |
|---|---|
| **Ator** | Voluntário |
| **Prioridade** | Essencial |
| **Requisitos** | RF04, NF-USA-02, NF-DES-01 |
| **Interfaces** | — (pendente, UI ainda não definida) |
| **Status** | Não implementado |

**Entradas e pré-condições**
- O voluntário possui cadastro ativo (UC02); existem vagas publicadas.

**Saídas e pós-condições**
- O voluntário visualiza a lista de vagas relevantes para seu perfil e pode prosseguir para a inscrição (UC05).

## Fluxo principal

1. O voluntário acessa a tela inicial (Home).
2. O sistema calcula e exibe as vagas compatíveis com habilidades, disponibilidade e localização do voluntário (RN04), em até 3 segundos (NF-DES-01).
3. Opcionalmente, o voluntário refina a busca manualmente por filtros (data, local, habilidade).
4. O voluntário seleciona uma vaga para visualizar os detalhes.

## Fluxos secundários

**FA1 — Nenhuma vaga compatível encontrada (passo 2)**
1. O sistema exibe mensagem informativa e sugere ampliar os filtros de busca.
