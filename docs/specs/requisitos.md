# Lista Completa de Requisitos

Fonte: [anexos/ponte-documento-entrega-final.pdf](./anexos/ponte-documento-entrega-final.pdf), seção 3.

## Requisitos Funcionais

Histórias de usuário, priorizadas para o desenvolvimento, com base nas personas Marta, João e Rafael.

| ID | Nome | Descrição | Prioridade |
|----|------|-----------|------------|
| US01 | Cadastro de ONG | Como coordenadora de ONG (Marta), quero cadastrar minha organização com perfil e áreas de atuação, para que os voluntários conheçam meu trabalho e confirmem minha credibilidade. | Alta |
| US02 | Cadastro de Voluntário | Como voluntário (João/Rafael), quero criar meu perfil preenchendo habilidades, disponibilidade e localização, para que o sistema valide meu perfil. | Alta |
| US03 | Publicação de Vagas | Como coordenadora de ONG, quero publicar uma ação informando data, local, quantidade de pessoas necessárias e habilidades exigidas, para atrair o voluntariado correto. | Alta |
| US04 | Busca e Sugestão Automática de Ações (Match) | Como voluntário com pouco tempo (Rafael), quero que a plataforma me mostre sugestões automáticas de ações compatíveis com meu perfil técnico e localização, além de permitir busca manual. | Alta |
| US05 | Inscrição Simplificada | Como voluntário, quero me inscrever em uma ação disponível de forma simples e rápida, para agilizar meu processo de candidatura. | Alta |
| US06 | Painel de Gestão de Vagas | Como coordenadora de ONG, quero visualizar a lista de inscritos nas minhas vagas e poder aprovar ou recusar candidaturas, para organizar a equipe e evitar faltas. | Alta |
| US07 | Geração de Certificado | Como estudante universitário (João), quero baixar um certificado digital após a conclusão de uma ação, para comprovar horas em atividades extracurriculares. | Média |
| US08 | Sistema de Lembretes | Como voluntário, quero receber notificações sobre a ação em que fui aprovado (data e local), para reduzir as chances de ausência. | Média |
| US09 | Avaliação Mútua (ONG e Voluntário) | Como usuário do sistema, quero poder avaliar a outra parte após a ação, para gerar um histórico de confiança e segurança na plataforma. | Média |
| US10 | Currículo de Impacto (Histórico) | Como voluntário, quero visualizar um histórico de todas as ações de que participei, para usar isso como um currículo de impacto social. | Baixa |

> Implementado na Sprint 1: US01 (parcial — cadastro de ONG) e US02 (parcial — cadastro de voluntário), via o módulo de [Gerenciamento de Usuários](./gerenciamento-usuarios.md). As demais histórias (vagas, match, inscrição, avaliação, certificado, histórico) ainda não foram implementadas.

## Requisitos Não Funcionais

Requisitos focados na qualidade, segurança e usabilidade do sistema.

| ID | Nome | Categoria | Descrição | Prioridade |
|----|------|-----------|-----------|------------|
| RNF01 | Acessibilidade Cognitiva e Facilidade de Uso | Usabilidade | A interface de gestão da ONG deve ser extremamente simplificada, limpa e sem jargões técnicos, permitindo a publicação de vagas de forma intuitiva. | Alta |
| RNF02 | Responsividade e Portabilidade | Usabilidade | O sistema deve ser totalmente responsivo (mobile first), garantindo que o voluntário possa buscar vagas, se inscrever e receber lembretes pelo celular de forma fluida. | Alta |
| RNF03 | Privacidade e Proteção de Dados | Segurança | O sistema deve proteger os dados pessoais de saúde e contato dos voluntários e os dados organizacionais das ONGs, em conformidade com a LGPD. | Alta |
| RNF04 | Desempenho na Busca | Desempenho | O tempo de carregamento da lista de vagas e do sistema de recomendação (Match) não deve ultrapassar 3 segundos. | Média |

## Regras de Negócio

Regras que derivam diretamente do fluxo funcional descrito nas histórias de usuário e que devem ser respeitadas independentemente da interface utilizada.

- **RN01**: Uma ONG só pode publicar vagas após concluir seu cadastro com perfil e áreas de atuação (US01).
- **RN02**: Um voluntário só pode se inscrever em vagas após completar seu perfil com habilidades, disponibilidade e localização (US02).
- **RN03**: Uma vaga não pode ser publicada sem data, local, número de vagas e habilidades exigidas (US03).
- **RN04**: O sistema só sugere uma vaga a um voluntário quando há compatibilidade entre as habilidades, a disponibilidade e a localização do voluntário e os requisitos da vaga (US04).
- **RN05**: Toda inscrição depende de aprovação da ONG responsável; o voluntário só é confirmado na ação após essa aprovação (US05, US06).
- **RN06**: Uma vaga que atinge o número máximo de aprovados não aceita novas aprovações (US06).
- **RN07**: O certificado digital de horas só pode ser emitido após a ONG confirmar a participação efetiva do voluntário na ação (US07).
- **RN08**: Lembretes automáticos só são enviados a voluntários cuja inscrição na ação foi aprovada (US08).
- **RN09**: A avaliação mútua entre ONG e voluntário só fica disponível após a data de realização da ação (US09).
- **RN10**: Dados pessoais de saúde e contato dos voluntários, assim como dados organizacionais das ONGs, devem ser tratados em conformidade com a LGPD (RNF03).

> Aplicadas na Sprint 1: RN01 e RN02, como validação de campos obrigatórios em `ControladorCadastro` (ver [gerenciamento-usuarios.md](./gerenciamento-usuarios.md)).

## Rastreabilidade

### Casos de Uso × Requisitos Funcionais

| Caso de Uso | Requisitos Funcionais Relacionados |
|---|---|
| UC01 — Cadastrar ONG | US01 |
| UC02 — Cadastrar Voluntário | US02 |
| UC03 — Publicar Vaga | US03 |
| UC04 — Buscar/Receber Sugestão (Match) | US04 |
| UC05 — Inscrever-se em Vaga | US05 |
| UC06 — Gerenciar Inscrições | US06, US08 (dispara lembretes ao aprovar) |
| UC07 — Avaliar Mutuamente | US09, US10 («include» histórico), US07 (subsidia certificado) |

### Casos de Uso × Requisitos Não Funcionais

| Caso de Uso | Requisitos Não Funcionais Relacionados |
|---|---|
| UC01 — Cadastrar ONG | RNF01, RNF03 |
| UC02 — Cadastrar Voluntário | RNF02, RNF03 |
| UC03 — Publicar Vaga | RNF01, RNF03 |
| UC04 — Buscar/Receber Sugestão (Match) | RNF02, RNF04 |
| UC05 — Inscrever-se em Vaga | RNF02 |
| UC06 — Gerenciar Inscrições | RNF01 |
| UC07 — Avaliar Mutuamente | RNF03 |
