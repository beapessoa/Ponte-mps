# Especificação de Requisitos — Ponte

> **Nota:** a descrição geral, o glossário, a elicitação e a lista de requisitos (RF/RNF) migraram para [`docs/01-visao.md`](../01-visao.md), [`docs/02-glossario.md`](../02-glossario.md), [`docs/03-elicitacao.md`](../03-elicitacao.md) e [`openspec/specs/`](../../openspec/specs/). Este diretório mantém os casos de uso, os diagramas e o módulo de gerenciamento de usuários.

Contrato de requisitos do sistema. Leia este diretório antes de implementar qualquer funcionalidade.

## Conteúdo

- [requisitos.md](./requisitos.md) — **desatualizado**, mantido só por referência histórica; os requisitos atuais estão em [`openspec/specs/`](../../openspec/specs/).
- [casos-de-uso.md](./casos-de-uso.md) — descrição completa dos sete casos de uso (UC01–UC07): atores, pré-condições, fluxo principal, fluxos alternativos e pós-condições.
- [gerenciamento-usuarios.md](./gerenciamento-usuarios.md) — especificação do módulo de Gerenciamento de Usuários (cadastro e listagem), escopo implementado na Sprint 1, com os diagramas de casos de uso e de classes de análise do módulo.
- [tratamento-erros-persistencia.md](./tratamento-erros-persistencia.md) — Laboratório 2: validação de login/senha por exceções e os dois mecanismos de persistência (RAM e arquivo binário), com o diagrama de classes atualizado.
- [anexos/](./anexos/) — imagens originais (PNG) dos diagramas de casos de uso e de classes de análise do módulo de Gerenciamento de Usuários; as versões atuais (Mermaid) estão em [`docs/04-casos-de-uso/`](../04-casos-de-uso/) e [`docs/05-analise.md`](../05-analise.md).

## Sobre o produto

A Ponte conecta ONGs que precisam de voluntários a pessoas dispostas a ajudar. A ONG publica uma ação informando data, local, quantidade de vagas e habilidades exigidas; o voluntário cria um perfil com habilidades, disponibilidade e localização; o sistema sugere ações compatíveis (Match) e permite busca manual; a inscrição depende de aprovação da ONG; ao final, ONG e voluntário se avaliam mutuamente e o voluntário acumula um histórico de participações, podendo emitir certificados digitais de horas.

## Usuários do sistema

- **ONG** — organização cadastrada, operada por uma coordenadora que publica vagas, gerencia inscrições e avalia voluntários.
- **Voluntário** — pessoa física cadastrada que busca, se inscreve e participa de ações voluntárias, sendo avaliada e acumulando histórico.

Personas de referência levantadas na elicitação: **Marta** (coordenadora de ONG, 42 anos — dor: divulgação desorganizada via WhatsApp/boca a boca), **João** (voluntário estudante, 21 anos — dor: falta de informação confiável sobre ações), **Rafael** (voluntário enfermeiro, 29 anos — dor: falta de tempo para buscar ações manualmente, motivo pelo qual o sistema evoluiu de busca manual para sugestão automática/Match).

## Origem

Documentos elicitados pela equipe (Beatriz Pessoa, Emyle Lucena, Maria Clara Dantas) via brainstorming, mapeamento de stakeholders, definição de personas, entrevistas e validação por Matriz CSD (Certezas, Suposições e Dúvidas) — ver [`docs/03-elicitacao.md`](../03-elicitacao.md).
