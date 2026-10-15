# Elicitação de requisitos

> Seção 4 do modelo de documento de requisitos. Duas técnicas centrais, complementadas por técnicas de apoio (ver §4.3). A matriz CSD completa e os registros da vivência estão em [`docs/specs/anexos/ponte-documento-entrega-final.pdf`](specs/anexos/ponte-documento-entrega-final.pdf) (Apêndices I e III).

## 4.1 Técnica 1 — Entrevistas (em imersão e acompanhamento)

| Campo | Registro |
|---|---|
| Período | Novembro de 2025 a abril de 2026 |
| Local | Presencial, durante a vivência "Tocando em Frente" (nov/dez 2025); conversas presenciais e remotas nos quatro primeiros meses de 2026 |
| Participantes | Emyle Lucena e Maria Clara Dantas, pela equipe; voluntários e representantes de ONGs contactados durante e após a vivência |

**Por que esta técnica:** as entrevistas foram escolhidas como técnica principal por permitirem o contato direto com os stakeholders reais (ONGs e voluntários), aprofundando dores, motivações e necessidades que dificilmente seriam captadas apenas em discussões internas da equipe.

**Cronograma:**

- *Novembro de 2025:* fase de imersão — primeiras conversas que originaram a ideia da plataforma.
- *Dezembro de 2025:* encerramento da vivência e consolidação inicial da ideia da Ponte.
- *Janeiro a abril de 2026:* fase de acompanhamento — conversas com ONGs e voluntários para tirar dúvidas, validar hipóteses e aprofundar as necessidades levantadas.

**Resultados obtidos:**

- Identificação do problema central — divulgação desorganizada das ações e falta de um canal confiável de encontro entre ONGs e voluntários (P1, P2);
- Caracterização dos dois perfis de usuário e origem das personas Marta (ONG), João (voluntário estudante) e Rafael (voluntário profissional);
- Levantamento das dores que fundamentaram as histórias de usuário, com destaque para a "falta de tempo" do profissional (Rafael), que motivou a evolução da busca manual (RF04) para a sugestão automática (Match).

## 4.2 Técnica 2 — Matriz CSD (Certezas, Suposições e Dúvidas)

| Campo | Registro |
|---|---|
| Período | Início de 2026, após a fase de entrevistas |
| Local | Reuniões da equipe, remotas e híbridas |
| Participantes | Equipe completa — Beatriz Pessoa, Emyle Lucena, Marcus Vinícius, Luís Aranha e Maria Clara Dantas |

**Por que esta técnica:** a Matriz CSD foi utilizada como técnica de validação, organizando o conhecimento da equipe em Certezas, Suposições e Dúvidas e cruzando essas hipóteses com as necessidades reais das personas e dos stakeholders. Ela permite transformar suposições e dúvidas em requisitos validados ou descartados de forma estruturada.

| Categoria | Item |
|---|---|
| Certeza | ONGs têm necessidade real e recorrente de voluntários, mas não possuem canal organizado para divulgar vagas. |
| Certeza | Voluntários estão dispostos a ajudar, mas não sabem onde, quando, nem como encontrar ações confiáveis. |
| Suposição | Voluntários usariam a plataforma de forma recorrente, e não apenas uma vez. |
| Suposição | ONGs estariam dispostas a substituir grupos de WhatsApp pela plataforma para divulgar vagas. |
| Dúvida | Voluntários gostariam de receber um certificado digital pela participação? → validada como necessidade real (originou/confirmou RF07). |
| Dúvida | ONGs teriam facilidade de uso com uma plataforma digital? → motivou o reforço do NF-USA-01 (acessibilidade cognitiva). |
| Dúvida | Uma barra de busca manual seria suficiente para voluntários com pouco tempo? → motivou a evolução do RF04 para sugestão automática (Match). |

**Resultados obtidos.** A análise da Matriz CSD, em conjunto com o debate sobre os perfis, levou a três melhorias concretas na lista de requisitos:

1. **Confirmação do requisito de certificado (RF07):** a dúvida "voluntários gostariam de receber um certificado?" foi cruzada com o stakeholder "estudantes universitários" e validada como forte motivação — persona João —, confirmando o requisito com prioridade Importante.
2. **Aprimoramento da busca (RF04):** ao validar a persona de profissional (Rafael), identificou-se a "falta de tempo" como dor principal, levando à evolução do requisito de busca manual para sugestão proativa (Match), mantendo a busca manual como complemento.
3. **Foco extremo em usabilidade (NF-USA-01):** a dúvida sobre a familiaridade das ONGs com plataformas digitais levou à criação de um requisito não funcional rigoroso de acessibilidade cognitiva.

## 4.3 Considerações finais

Além das duas técnicas centrais, o processo de elicitação foi apoiado por técnicas complementares, acompanhadas pela equipe em um quadro Trello:

- **Brainstorming da equipe** — sessões iniciais para levantamento do problema e de possíveis soluções;
- **Mapeamento de stakeholders** — identificação dos envolvidos diretos (ONGs e voluntários) e de seus papéis;
- **Definição de personas** — construção de Marta, João e Rafael a partir dos perfis identificados;
- **Prototipação de baixa fidelidade** — validação do fluxo essencial (publicar vaga → buscar/sugestão → inscrição) junto aos usuários.

O conjunto dessas técnicas, conduzido entre o final de 2025 e o início de 2026, forneceu a base para a definição do escopo e para a especificação dos requisitos apresentados em [`openspec/specs/`](../openspec/specs/). A elicitação precedeu e fundamentou o desenvolvimento, cuja primeira sprint implementou o módulo de gerenciamento de usuários (cadastro e listagem de ONGs e voluntários).

### Rastreabilidade problema → requisito

| Problema | Requisitos |
|---|---|
| P1 — Divulgação pulverizada | RF03 (Publicação de Vagas), NF-USA-01 |
| P2 — Falta de informação confiável para o voluntário | RF04 (Match e busca manual) |
| P3 — Escassez de tempo | RF04 (Match) |
| P4 — Baixa familiaridade digital das ONGs | NF-USA-01 (Acessibilidade Cognitiva) |
| P5 — Ausência de histórico e confiança | RF09 (Avaliação Mútua), RF10 (Currículo de Impacto) |
