# Proposta: crud-vaga

## Why

A Sprint 3 pede o CRUD de uma entidade principal relacionada a Usuário. No Ponte, essa entidade é a **Vaga**: é o que a ONG publica e o que o voluntário procura, e sem ela o ciclo central da plataforma (cadastro → publicação → Match → inscrição, ver `docs/01-visao.md`) não começa. Na elicitação (`docs/03-elicitacao.md`), a persona Marta citou como principal dor a divulgação desorganizada das ações por WhatsApp e boca a boca.

> Registro retroativo: o CRUD foi implementado na Sprint 3 (tag `v0.3.0`) com a spec escrita diretamente em `openspec/specs/vagas/`. Este change refaz o caminho que o processo exige (proposal → delta → design → tasks → archive) e acrescenta o vínculo obrigatório com a ONG.

## What Changes

- Novo requisito **RF03 — Publicação de Vagas**: a ONG publica uma vaga com data, local, quantidade e habilidades exigidas. A vaga fica vinculada a uma ONG **cadastrada**.
- Novo requisito **RF11 — Atualizar Vaga**.
- Novo requisito **RF12 — Remover Vaga**.
- Leitura (buscar por id e listar) disponível pela fachada, para apoiar a atualização e a remoção.

**Fora do escopo:** busca/filtro por habilidade ou localização e o Match (RF04), inscrições (RF05), descrição livre da ação, persistência de vagas em arquivo ou banco (fica para o padrão Repository da Sprint 4) e controle de permissão de "ONG só edita a própria vaga" (depende de sessão/login).

## Capabilities

### New Capabilities
- `vagas`: publicação, consulta, atualização e remoção de vagas pelas ONGs

### Modified Capabilities
- (nenhuma)

## Impact

- Novas classes `Vaga`, `RepositorioVagas` (porta), `RepositorioVagasRAM` (adaptador) e `ControladorVagas`.
- `FacadeSingletonController` passa a expor o CRUD de vagas e `contarEntidadesCadastradas()` (usuários + vagas). Ver ADR-0002.
- Casos de uso UC03, UC09 e UC10, e telas TL02 e TL03.
