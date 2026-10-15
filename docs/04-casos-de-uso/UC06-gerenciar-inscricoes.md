# [UC06] Gerenciar Inscrições (Aprovar/Recusar)

Permite que a ONG visualize os inscritos em suas vagas e aprove ou recuse cada inscrição, organizando a equipe da ação.

| Campo | Valor |
|---|---|
| **Ator** | ONG (Coordenadora) |
| **Ator secundário** | Voluntário (notificado) |
| **Prioridade** | Importante |
| **Requisitos** | RF06, RF08, NF-USA-01, NF-CON-01 |
| **Interfaces** | — (pendente, UI ainda não definida) |
| **Status** | Não implementado |

**Entradas e pré-condições**
- Existem inscrições pendentes em vagas publicadas pela ONG (UC05).

**Saídas e pós-condições**
- Voluntários aprovados passam a receber lembretes automáticos sobre a ação (RF08).

## Fluxo principal

1. A coordenadora acessa o painel de gestão de vagas.
2. O sistema exibe a lista de inscritos por vaga.
3. A coordenadora aprova ou recusa cada inscrição.
4. O sistema atualiza o status da inscrição (RN05) e notifica o voluntário correspondente.

## Fluxos secundários

**FA1 — Vaga atinge o número máximo de aprovados (passo 3)**
1. O sistema impede novas aprovações e sugere lista de espera (RN06).
