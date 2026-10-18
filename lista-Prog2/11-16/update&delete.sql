UPDATE usuarios
SET nome = 'Ana Souza Pereira'
WHERE id_usuario = 1;

UPDATE livros
SET quantidade_disponivel = quantidade_disponivel + 1
WHERE id_livro = 4;

UPDATE emprestimos
SET data_devolucao = '2026-10-17'
WHERE id_emprestimo = 3;

DELETE FROM emprestimos
WHERE id_usuario = 3;

DELETE FROM usuarios
WHERE id_usuario = 3;

DELETE FROM livros_autores
WHERE id_livro = 6;

DELETE FROM livros
WHERE id_livro = 6;