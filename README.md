# Questão 10 — Comparando lista, pilha e fila

## A. Histórico do navegador

**Estrutura escolhida: Pilha**

Espera-se retornar à página visitada mais recentemente, não à mais antiga.
Isso é comportamento **LIFO** (último a entrar, primeiro a sair).

---

## B. Pessoas aguardando atendimento

**Estrutura escolhida: Fila**

O critério é ordem de chegada: quem chegou primeiro deve ser atendido primeiro.
Isso é comportamento **FIFO** (primeiro a entrar, primeiro a sair).

---

## C. Catálogo de produtos

**Estrutura escolhida: Lista**

O usuário precisa poder acessar ou buscar produtos em qualquer posição,
independentemente de quando foram cadastrados. Uma lista é a melhor opção.

---

## D. Função "desfazer" de um editor de texto

**Estrutura escolhida: Pilha**

Espera-se reverter a ação mais recente, não a mais antiga.
Isso é comportamento **LIFO** (último a entrar, primeiro a sair).

---

## E. Playlist de músicas que pode ser acessada por posição

**Estrutura escolhida: Lista**

O usuário precisa poder acessar a música que ele quer, independentemente
da posição. Uma lista é a melhor opção.

# Questão 14 - Explique o que pode acontecer ao tentar excluir um registro relacionado a outros registros.

Apagar o registro “pai” deixaria os registros “filhos” apontando para algo que não existe mais, quebrando a integridade. Para excluir com segurança, é preciso apagar primeiro os registros dependentes e só depois o registro principal, seguindo a ordem dos filhos para os pais.
