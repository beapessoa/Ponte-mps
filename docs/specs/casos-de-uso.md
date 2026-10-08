# Descrição dos Casos de Uso

Fonte: [anexos/ponte-documento-entrega-final.pdf](./anexos/ponte-documento-entrega-final.pdf), seções 4 e 5.

O sistema tem dois atores, **ONG** e **Voluntário**, com sete casos de uso. "Avaliar Mutuamente" é compartilhado pelos dois atores e alimenta («include») o histórico de impacto do voluntário.

## UC01: Cadastrar ONG

- **Ator primário:** ONG (Coordenadora)
- **Descrição:** Permite que uma organização crie seu perfil na plataforma, informando dados institucionais e áreas de atuação, para que voluntários conheçam seu trabalho e confirmem sua credibilidade.
- **Pré-condições:** A organização ainda não possui cadastro na plataforma.
- **Fluxo principal:**
  1. A coordenadora acessa a opção "Cadastrar ONG".
  2. O sistema solicita dados institucionais (nome, descrição, contato, áreas de atuação).
  3. A coordenadora preenche e confirma os dados.
  4. O sistema valida os campos obrigatórios (RN01).
  5. O sistema cria o perfil da ONG e exibe mensagem de sucesso.
- **Fluxos alternativos / exceção:**
  - 4a. Campos obrigatórios ausentes ou inválidos: o sistema exibe mensagem de erro e solicita correção.
- **Pós-condições:** O perfil da ONG é criado e fica disponível para publicação de vagas (UC03).

## UC02: Cadastrar Voluntário

- **Ator primário:** Voluntário
- **Descrição:** Permite que um voluntário crie seu perfil informando habilidades, disponibilidade e localização, para receber sugestões de vagas compatíveis.
- **Pré-condições:** O voluntário ainda não possui cadastro na plataforma.
- **Fluxo principal:**
  1. O voluntário acessa "Cadastrar Voluntário".
  2. O sistema solicita dados pessoais, habilidades, disponibilidade e localização.
  3. O voluntário preenche e confirma os dados.
  4. O sistema valida o perfil preenchido (RN02).
  5. O sistema cria o perfil do voluntário e exibe mensagem de sucesso.
- **Fluxos alternativos / exceção:**
  - 4a. Dados incompletos: o sistema solicita complementação antes de liberar buscas e inscrições.
- **Pós-condições:** O perfil de voluntário é criado e fica apto a buscar (UC04) e se inscrever em vagas (UC05).

## UC03: Publicar Vaga

- **Ator primário:** ONG (Coordenadora)
- **Descrição:** Permite que a ONG publique uma ação voluntária informando data, local, número de vagas e habilidades exigidas.
- **Pré-condições:** A ONG possui cadastro ativo (UC01).
- **Fluxo principal:**
  1. A coordenadora acessa "Publicar Vaga" no painel da ONG.
  2. O sistema exibe formulário simplificado (data, local, nº de vagas, habilidades exigidas, descrição da ação), em linha com RNF01.
  3. A coordenadora preenche os campos e confirma.
  4. O sistema valida os dados obrigatórios (RN03).
  5. O sistema publica a vaga, tornando-a visível para busca e sugestão automática.
- **Fluxos alternativos / exceção:**
  - 4a. Campos obrigatórios ausentes: o sistema exibe erro e mantém o formulário preenchido para correção.
- **Pós-condições:** A vaga fica disponível para voluntários buscarem manualmente ou receberem como sugestão (Match).

## UC04: Buscar e Receber Sugestão de Vagas (Match)

- **Ator primário:** Voluntário
- **Descrição:** O sistema sugere automaticamente vagas compatíveis com o perfil do voluntário e permite também a busca manual por filtros.
- **Pré-condições:** O voluntário possui cadastro ativo (UC02); existem vagas publicadas.
- **Fluxo principal:**
  1. O voluntário acessa a tela inicial (Home).
  2. O sistema calcula e exibe as vagas compatíveis com habilidades, disponibilidade e localização do voluntário (RN04), em até 3 segundos (RNF04).
  3. Opcionalmente, o voluntário refina a busca manualmente por filtros (data, local, habilidade).
  4. O voluntário seleciona uma vaga para visualizar os detalhes.
- **Fluxos alternativos / exceção:**
  - 2a. Nenhuma vaga compatível é encontrada: o sistema exibe mensagem informativa e sugere ampliar os filtros de busca.
- **Pós-condições:** O voluntário visualiza a lista de vagas relevantes para seu perfil e pode prosseguir para a inscrição (UC05).

## UC05: Inscrever-se em Vaga

- **Ator primário:** Voluntário
- **Descrição:** Permite que o voluntário se candidate a uma vaga publicada de forma simples e rápida, com um único clique.
- **Pré-condições:** O voluntário está autenticado e visualiza os detalhes de uma vaga (UC04).
- **Fluxo principal:**
  1. O voluntário acessa a tela de detalhes da vaga.
  2. O voluntário seleciona "Quero Ajudar / Inscrever-se".
  3. O sistema registra a inscrição com status "pendente".
  4. O sistema notifica a ONG responsável sobre a nova inscrição.
- **Fluxos alternativos / exceção:**
  - 1a. A vaga já atingiu o número de vagas necessário: o sistema informa a indisponibilidade e sugere vagas similares.
- **Pós-condições:** A inscrição fica pendente de aprovação pela ONG (UC06).

## UC06: Gerenciar Inscrições (Aprovar/Recusar)

- **Ator primário:** ONG (Coordenadora)
- **Ator secundário:** Voluntário (notificado)
- **Descrição:** Permite que a ONG visualize os candidatos inscritos em suas vagas e aprove ou recuse cada candidatura, organizando a equipe da ação.
- **Pré-condições:** Existem inscrições pendentes em vagas publicadas pela ONG (UC05).
- **Fluxo principal:**
  1. A coordenadora acessa o painel de gestão de vagas.
  2. O sistema exibe a lista de inscritos por vaga.
  3. A coordenadora aprova ou recusa cada candidatura.
  4. O sistema atualiza o status da inscrição (RN05) e notifica o voluntário correspondente.
- **Fluxos alternativos / exceção:**
  - 3a. A vaga atinge o número máximo de aprovados: o sistema impede novas aprovações e sugere lista de espera (RN06).
- **Pós-condições:** Voluntários aprovados passam a receber lembretes automáticos sobre a ação (US08).

## UC07: Avaliar Mutuamente

- **Ator primário:** ONG (Coordenadora)
- **Ator secundário:** Voluntário
- **Descrição:** Após a realização da ação, ONG e voluntário avaliam um ao outro, construindo um histórico de confiança e segurança na plataforma.
- **Pré-condições:** A ação já ocorreu; o voluntário teve sua participação registrada (RN09).
- **Fluxo principal:**
  1. O sistema libera a avaliação para ambas as partes após a data da ação.
  2. A ONG avalia o desempenho do voluntário na ação.
  3. O voluntário avalia sua experiência com a ONG.
  4. O sistema registra as avaliações no histórico de ambos.
- **Pós-condições:** As avaliações compõem o histórico de confiança da ONG e alimentam («include») o currículo de impacto do voluntário (US10), podendo também subsidiar a emissão do certificado digital (US07).
