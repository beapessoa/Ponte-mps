# Visão do sistema — Ponte

> Equivale às seções 1 (Introdução) e 2 (Descrição geral) do modelo de documento de requisitos. Primeira versão migrada de [`docs/documento-requisitos/main.pdf`](documento-requisitos/main.pdf) para o formato versionado em Markdown adotado pela disciplina.

## 1. Introdução

### 1.1 Propósito deste repositório

Este repositório especifica a **Ponte**, uma plataforma que conecta organizações não governamentais (ONGs) que precisam de voluntários a pessoas dispostas a ajudar. Destina-se à equipe de desenvolvimento, ao professor da disciplina e aos demais interessados no projeto.

### 1.2 Organização

| Onde | O quê |
|---|---|
| `docs/01-visao.md` | Este arquivo: motivação, problemas, escopo, usuários, restrições |
| `docs/02-glossario.md` | Termos do domínio |
| `docs/03-elicitacao.md` | Técnicas de elicitação usadas e seus registros |
| `openspec/specs/` | Requisitos funcionais e não funcionais (fonte da verdade) |
| `docs/specs/` | Casos de uso, diagramas de classes de análise e módulo de gerenciamento de usuários (ainda no formato anterior; migração em andamento) |

### 1.3 Documentos relacionados

1. **Documento de Entrega Final — Especificação de Requisitos de Software (Ponte)**; Equipe Ponte; 2026; Centro de Informática, UFPB. Fonte original do conteúdo de produto, personas, requisitos e processo de elicitação ([`docs/specs/anexos/ponte-documento-entrega-final.pdf`](specs/anexos/ponte-documento-entrega-final.pdf)).
2. **1ª versão do documento de requisitos (PDF)**; Equipe Ponte; 07/10/2026 ([`docs/documento-requisitos/main.pdf`](documento-requisitos/main.pdf)) — conteúdo migrado para este arquivo, para `02-glossario.md`, `03-elicitacao.md` e `openspec/specs/`.
3. [Glossário](02-glossario.md).

## 2. Descrição geral

### 2.1 Motivação

ONGs têm demanda real e contínua por voluntariado, mas não possuem um canal organizado e central para divulgar suas necessidades. Do outro lado, há pessoas dispostas a ajudar — estudantes em busca de experiência prática e horas extracurriculares, profissionais que desejam contribuir com seu conhecimento técnico, ou qualquer pessoa interessada em causas sociais — que não encontram ações confiáveis próximas ao seu perfil e à sua disponibilidade. A Ponte nasce para eliminar esse descompasso, oferecendo um ponto de encontro confiável entre quem precisa de ajuda e quem quer ajudar.

### 2.2 Problemas identificados

| # | Problema | Quem é afetado |
|---|---|---|
| P1 | **Divulgação pulverizada** — a comunicação das ações ocorre principalmente por grupos de WhatsApp e boca a boca, de modo que a maior parte das pessoas dispostas a ajudar nunca fica sabendo das oportunidades disponíveis. | ONGs, voluntários |
| P2 | **Falta de informação confiável para o voluntário** — não há um lugar onde o voluntário possa encontrar, de forma organizada, ações confiáveis compatíveis com seu perfil e localização. | Voluntários |
| P3 | **Escassez de tempo** — voluntários com rotina intensa não dispõem de tempo para procurar ações manualmente, o que exige um mecanismo de sugestão automática. | Voluntários |
| P4 | **Baixa familiaridade digital das ONGs** — parte das organizações não tem familiaridade com plataformas digitais, exigindo uma interface extremamente simples e à prova de erros. | ONGs |
| P5 | **Ausência de histórico e confiança** — sem um registro de participações e avaliações, falta um mecanismo que gere confiança entre as partes e reconheça o impacto do voluntário. | ONGs, voluntários |

### 2.3 Visão geral do sistema

A Ponte é um sistema **independente e auto-contido** nesta fase do projeto: não depende de integração com sistemas externos para executar seu fluxo principal.

**O sistema fará** (detalhado por capacidade em [`openspec/specs/`](../openspec/specs/)):

- Cadastro de ONGs e de voluntários, com perfis contendo áreas de atuação (ONG) e habilidades, disponibilidade e localização (voluntário);
- Publicação de ações (vagas) com data, local, número de vagas e habilidades exigidas;
- Sugestão automática de ações compatíveis com o perfil do voluntário (Match), além de busca manual por filtros;
- Inscrição simplificada em ações e gestão das inscrições pela ONG (aprovar/recusar);
- Lembretes sobre ações aprovadas, avaliação mútua entre ONG e voluntário, histórico de participações (currículo de impacto) e emissão de certificados digitais de horas.

**Priorização.** Das 10 funcionalidades levantadas, o núcleo mínimo que concentra o maior valor para o produto — RF01 (Cadastro de ONG) e RF02 (Cadastro de Voluntário) — representa os **20% mais importantes do sistema** e foi o único já implementado, na Sprint 1 (módulo de [Gerenciamento de Usuários](specs/gerenciamento-usuarios.md)). Os demais requisitos classificados como **Essenciais** — RF03 (Publicação de Vagas), RF04 (Match) e RF05 (Inscrição) — completam o ciclo *core business* da plataforma (cadastro → publicação → match → inscrição) e orientam as próximas sprints, ainda sem implementação. Requisitos **Importantes** (RF06–RF09) e **Desejáveis** (RF10) detalham o restante do produto. Ver a priorização completa, requisito a requisito, em [`openspec/specs/`](../openspec/specs/).

**Escopo negativo (o que o sistema não fará):**

- Não realizará intermediação financeira, doações em dinheiro ou pagamentos entre as partes;
- Não funcionará como rede social (não haverá feed, mensagens diretas livres ou publicações sociais além do necessário ao voluntariado);
- Não fará gestão interna/administrativa das ONGs (contabilidade, folha, estoque);
- Funcionalidades como emissão de certificados, lembretes automáticos e histórico de impacto compõem o escopo do produto, mas serão entregues em iterações futuras, após o núcleo (cadastro, publicação, Match e inscrição).

### 2.4 Usuários do sistema

O sistema Ponte possui dois perfis de usuário principais, que representam os dois lados conectados pela plataforma:

- **Usuário ONG:** representa a organização cadastrada; é operado por uma coordenadora que publica vagas, gerencia inscrições e avalia voluntários.
- **Usuário Voluntário:** pessoa física cadastrada que busca, se inscreve e participa de ações voluntárias, sendo avaliada e acumulando histórico de participação.

Para guiar o levantamento de requisitos, a equipe definiu três personas que sintetizam os perfis reais de uso identificados na elicitação (ver [`03-elicitacao.md`](03-elicitacao.md)).

#### Persona — Marta (Usuário ONG)

- **Perfil:** 42 anos, coordenadora de ONG. Coordena uma organização de campanhas de arrecadação de medicamentos e ações em comunidades.
- **Objetivo:** conseguir voluntários confiáveis para ações pontuais.
- **Principal dor:** divulgação desorganizada e comunicação descentralizada (grupos de WhatsApp, boca a boca).
- **Necessidade:** publicar vagas com data, local e requisitos, e aprovar ou recusar inscritos de forma simples.

#### Persona — João (Usuário Voluntário)

- **Perfil:** 21 anos, estudante universitário voluntário. Quer participar de ações, mas não sabe onde encontrar oportunidades confiáveis.
- **Objetivo:** ajudar em causas sociais e ganhar experiência prática, incluindo horas extracurriculares.
- **Principal dor:** falta de informação confiável sobre as ações disponíveis.
- **Necessidade:** buscar ações próximas e se inscrever facilmente.

#### Persona — Rafael (Usuário Voluntário)

- **Perfil:** 29 anos, enfermeiro voluntário. Deseja participar de ações sociais de saúde e contribuir com conhecimento técnico.
- **Objetivo:** contribuir com conhecimento técnico e orientação em saúde.
- **Principal dor:** falta de tempo para procurar ações manualmente.
- **Necessidade:** receber sugestões de ações compatíveis com suas habilidades e localização — motivo pelo qual o sistema evoluiu de uma busca manual para a sugestão automática (Match).

### 2.5 Suposições e restrições gerais

- **Conformidade legal (LGPD):** os dados pessoais de contato e de saúde dos voluntários, bem como os dados organizacionais das ONGs, devem ser tratados em conformidade com a Lei Geral de Proteção de Dados.
- **Mobile-first:** assume-se que o voluntário utilizará preferencialmente o celular; a experiência deve ser responsiva e fluida nesse contexto.
- **Acessibilidade cognitiva:** assume-se que parte das ONGs tem baixa familiaridade com plataformas digitais; a interface de gestão deve ser simples e sem jargões técnicos.
- **Plataforma tecnológica:** o sistema está sendo desenvolvido em TypeScript/Node.js, com organização em camadas (fronteira, controle e entidade).
- **Persistência da fase atual:** na sprint inicial a persistência é feita em memória (RAM), sem banco de dados; a substituição por uma persistência durável está prevista para iterações futuras, sem alterar os contratos públicos dos controladores.
- **Dependência de conectividade:** o uso pleno da plataforma pressupõe acesso à internet por parte de ONGs e voluntários.
