SELECT u.nome AS usuario, l.titulo AS livro
FROM emprestimos e
JOIN usuarios u ON u.id_usuario = e.id_usuario
JOIN livros l ON l.id_livro = e.id_livro;

SELECT e.id_emprestimo, u.nome AS usuario, l.titulo AS livro,
       e.data_emprestimo, e.data_prevista_devolucao, e.data_devolucao
FROM emprestimos e
JOIN usuarios u ON u.id_usuario = e.id_usuario
JOIN livros l ON l.id_livro = e.id_livro
ORDER BY e.data_emprestimo;

SELECT e.id_emprestimo, u.nome AS usuario, l.titulo AS livro,
       e.data_emprestimo, e.data_prevista_devolucao
FROM emprestimos e
JOIN usuarios u ON u.id_usuario = e.id_usuario
JOIN livros l ON l.id_livro = e.id_livro
WHERE e.data_devolucao IS NULL;

SELECT u.nome AS usuario, COUNT(e.id_emprestimo) AS total_emprestimos
FROM usuarios u
LEFT JOIN emprestimos e ON e.id_usuario = u.id_usuario
GROUP BY u.id_usuario, u.nome
ORDER BY total_emprestimos DESC;

SELECT l.id_livro, l.titulo
FROM livros l
LEFT JOIN emprestimos e ON e.id_livro = l.id_livro
WHERE e.id_emprestimo IS NULL;