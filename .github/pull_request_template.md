## O que muda

<!-- O quê e por quê, em poucas linhas. Se houver change: openspec/changes/<nome>/proposal.md -->

**Título no formato de commit:** `feat(escopo): descrição no imperativo` · ver [CONTRIBUTING](../CONTRIBUTING.md)

## Checklist

- [ ] Branch parte de `develop` (ou de `main`, se for hotfix) e segue `<tipo>/<escopo>-<descricao>`
- [ ] CI verde (testes, typecheck e validação do OpenSpec)
- [ ] Cobertura não regrediu; todo bug corrigido tem um teste que o reproduz
- [ ] Nenhum `TODO` novo sem issue associada
- [ ] PR com até ~400 linhas (ou justificativa)

### Se mexeu em requisitos ou documentação

- [ ] Todo requisito novo ou modificado tem ID, **Prioridade** e pelo menos um cenário
- [ ] IDs existentes não foram renumerados nem reaproveitados
- [ ] Glossário atualizado se surgiu termo novo
- [ ] Casos de uso, telas e diagramas afetados foram atualizados
- [ ] Decisões de arquitetura registradas como ADR
- [ ] Ao concluir a implementação: change arquivado (`openspec archive <nome>`)

## Como testei

<!-- Comandos rodados, prints ou vídeo. -->
