# Tasks

## 1. Documentação

- [x] 1.1 Delta da spec `acessos` com RF15 e RF16 e seus cenários
- [x] 1.2 ADR-0003 (Repository + Abstract Factory) e ADR-0004 (Adapter de log)
- [x] 1.3 Diagrama de classes de projeto separando business e infra, e tabela de padrões (`docs/08-projeto.md`)

## 2. Implementação

- [x] 2.1 Entidade `Acesso`, porta `RepositorioAcessos` e repositórios em RAM e arquivo
- [x] 2.2 Abstract Factory `FabricaRepositorios` com as fábricas RAM e arquivo
- [x] 2.3 Porta `Registrador` e `AdaptadorRegistradorPino`
- [x] 2.4 Template Method `RelatorioAcessos` com `RelatorioAcessosHTML` e `RelatorioAcessosCSV`
- [x] 2.5 `ControladorAcessos` (`entrar`, `gerarRelatorio`), fachada e CLI (opções 10 e 11)

## 3. Verificação

- [x] 3.1 `npm test` verde (115 testes) e `npm run typecheck` sem erros
- [x] 3.2 CLI testada de ponta a ponta: entrada recusada, entrada válida, relatórios HTML e CSV, `ponte.log`
- [x] 3.3 `openspec validate --all`: 11 itens válidos, 0 falhas
