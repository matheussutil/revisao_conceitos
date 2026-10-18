INSERT INTO autores (nome, nacionalidade, data_nascimento) VALUES
('Machado de Assis', 'Brasileira', '1839-06-21'),
('Clarice Lispector', 'Brasileira', '1920-12-10'),
('Jorge Amado', 'Brasileira', '1912-08-10'),
('George Orwell', 'Britânica', '1903-06-25'),
('Graciliano Ramos', 'Brasileira', '1892-10-27');

INSERT INTO livros (titulo, isbn, ano_publicacao, editora, quantidade_total, quantidade_disponivel) VALUES
('Dom Casmurro', '978-85-0000-001-1', 1899, 'Editora Garnier', 3, 2),
('Memórias Póstumas de Brás Cubas', '978-85-0000-002-8', 1881, 'Editora Garnier', 2, 2),
('A Hora da Estrela', '978-85-0000-003-5', 1977, 'Rocco', 2, 1),
('Capitães da Areia', '978-85-0000-004-2', 1937, 'Companhia das Letras', 1, 0),
('1984', '978-85-0000-005-9', 1949, 'Companhia das Letras', 4, 4),
('Vidas Secas', '978-85-0000-006-6', 1938, 'Record', 2, 2);

INSERT INTO livros_autores (id_livro, id_autor) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 3),
(5, 4),
(6, 5);

INSERT INTO usuarios (nome, email, telefone, data_cadastro) VALUES
('Ana Souza', 'ana.souza@email.com', '(11) 91111-1111', '2026-01-10'),
('Bruno Lima', 'bruno.lima@email.com', '(11) 92222-2222', '2026-03-22'),
('Carla Mendes', 'carla.mendes@email.com', '(11) 93333-3333', '2026-06-05');

INSERT INTO emprestimos (id_usuario, id_livro, data_emprestimo, data_prevista_devolucao, data_devolucao) VALUES
(1, 1, '2026-10-01', '2026-10-15', NULL),
(2, 3, '2026-10-05', '2026-10-19', NULL),
(3, 4, '2026-10-10', '2026-10-24', NULL),
(1, 5, '2026-09-01', '2026-09-15', '2026-09-14');

SELECT * FROM livros;

SELECT l.titulo, a.nome AS autor
FROM livros l
JOIN livros_autores la ON la.id_livro = l.id_livro
JOIN autores a ON a.id_autor = la.id_autor;

SELECT l.titulo, a.nome AS autor
FROM livros l
JOIN livros_autores la ON la.id_livro = l.id_livro
JOIN autores a ON a.id_autor = la.id_autor
WHERE a.nome = 'Machado de Assis';

SELECT titulo FROM livros ORDER BY titulo ASC;

SELECT titulo, quantidade_disponivel
FROM livros
WHERE quantidade_disponivel > 0;