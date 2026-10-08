# Especificação de Requisitos — Ponte

Contrato de requisitos do sistema. Leia este diretório antes de implementar qualquer funcionalidade (ver seção 6 do [`CONTRIBUTING.md`](../../CONTRIBUTING.md), "Para Agentes IA").

## Conteúdo

- [requisitos.md](./requisitos.md) — requisitos funcionais (US01–US10), requisitos não funcionais (RNF01–RNF04) e regras de negócio (RN01–RN10).
- [casos-de-uso.md](./casos-de-uso.md) — descrição completa dos sete casos de uso (UC01–UC07): atores, pré-condições, fluxo principal, fluxos alternativos e pós-condições.
- [gerenciamento-usuarios.md](./gerenciamento-usuarios.md) — especificação do módulo de Gerenciamento de Usuários (cadastro e listagem), escopo implementado na Sprint 1, com os diagramas de casos de uso e de classes de análise do módulo.
- [diagramas/](./diagramas/) — diagramas de casos de uso e de classes de análise do módulo de Gerenciamento de Usuários.
- [anexos/](./anexos/) — documento de entrega final completo (Especificação de Requisitos de Software, UFPB), fonte de todo o conteúdo acima.

## Sobre o produto

A Ponte conecta ONGs que precisam de voluntários a pessoas dispostas a ajudar. A ONG publica uma ação informando data, local, quantidade de vagas e habilidades exigidas; o voluntário cria um perfil com habilidades, disponibilidade e localização; o sistema sugere ações compatíveis (Match) e permite busca manual; a inscrição depende de aprovação da ONG; ao final, ONG e voluntário se avaliam mutuamente e o voluntário acumula um histórico de participações, podendo emitir certificados digitais de horas.

## Usuários do sistema

- **ONG** — organização cadastrada, operada por uma coordenadora que publica vagas, gerencia inscrições e avalia voluntários.
- **Voluntário** — pessoa física cadastrada que busca, se inscreve e participa de ações voluntárias, sendo avaliada e acumulando histórico.

Personas de referência levantadas na elicitação: **Marta** (coordenadora de ONG, 42 anos — dor: divulgação desorganizada via WhatsApp/boca a boca), **João** (voluntário estudante, 21 anos — dor: falta de informação confiável sobre ações), **Rafael** (voluntário enfermeiro, 29 anos — dor: falta de tempo para buscar ações manualmente, motivo pelo qual o sistema evoluiu de busca manual para sugestão automática/Match).

## Origem

Documentos elicitados pela equipe (Beatriz Pessoa, Emyle Lucena, Marcus Vinícius, Luís Aranha, Maria Clara Dantas) via brainstorming, mapeamento de stakeholders, definição de personas, entrevistas e validação por Matriz CSD (Certezas, Suposições e Dúvidas) — ver Apêndices I–III do anexo em [anexos/ponte-documento-entrega-final.pdf](./anexos/ponte-documento-entrega-final.pdf).
