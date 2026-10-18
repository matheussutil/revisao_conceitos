// Sistema Escolar - Orientação a Objetos com Herança

// ===== Classe base =====
class Pessoa {
  constructor(nome, dataNascimento) {
    this.nome = nome;
    this.dataNascimento = new Date(dataNascimento); // formato "AAAA-MM-DD"
  }

  // Calcula a idade a partir da data de nascimento
  calcularIdade() {
    const hoje = new Date();
    let idade = hoje.getFullYear() - this.dataNascimento.getFullYear();
    const jaFezAniversario =
      hoje.getMonth() > this.dataNascimento.getMonth() ||
      (hoje.getMonth() === this.dataNascimento.getMonth() &&
        hoje.getDate() >= this.dataNascimento.getDate());

    if (!jaFezAniversario) {
      idade--;
    }
    return idade;
  }

  formatarData() {
    return this.dataNascimento.toLocaleDateString("pt-BR", { timeZone: "UTC" });
  }

  apresentar() {
    console.log(`Nome: ${this.nome}`);
    console.log(`Data de nascimento: ${this.formatarData()} (${this.calcularIdade()} anos)`);
  }
}

// ===== Aluno herda de Pessoa =====
class Aluno extends Pessoa {
  constructor(nome, dataNascimento, matricula, curso) {
    super(nome, dataNascimento);
    this.matricula = matricula;
    this.curso = curso;
    this.notas = [];
  }

  adicionarNota(nota) {
    if (typeof nota !== "number" || isNaN(nota) || nota < 0 || nota > 10) {
      console.log(`⚠️  Nota inválida (${nota}). Use um valor entre 0 e 10.`);
      return false;
    }
    this.notas.push(nota);
    return true;
  }

  calcularMedia() {
    if (this.notas.length === 0) {
      return 0;
    }
    const soma = this.notas.reduce((acc, nota) => acc + nota, 0);
    return soma / this.notas.length;
  }

  obterSituacao() {
    if (this.notas.length === 0) {
      return "Sem notas";
    }
    return this.calcularMedia() >= 6 ? "Aprovado" : "Reprovado";
  }

  // Sobrescreve (polimorfismo) o método da classe pai
  apresentar() {
    console.log("--- ALUNO ---");
    super.apresentar();
    console.log(`Matrícula: ${this.matricula}`);
    console.log(`Curso: ${this.curso}`);
    console.log(`Notas: ${this.notas.length > 0 ? this.notas.join(", ") : "nenhuma"}`);
    console.log(`Média: ${this.calcularMedia().toFixed(2)} (${this.obterSituacao()})`);
  }
}

// ===== Professor herda de Pessoa =====
class Professor extends Pessoa {
  constructor(nome, dataNascimento, matricula, disciplina) {
    super(nome, dataNascimento);
    this.matricula = matricula;
    this.disciplina = disciplina;
  }

  // Sobrescreve (polimorfismo) o método da classe pai
  apresentar() {
    console.log("--- PROFESSOR ---");
    super.apresentar();
    console.log(`Matrícula: ${this.matricula}`);
    console.log(`Disciplina: ${this.disciplina}`);
  }
}

// ===== Testes =====

const aluno1 = new Aluno("Ana Souza", "2005-03-15", "A2024001", "Ciência da Computação");
aluno1.adicionarNota(8.5);
aluno1.adicionarNota(7.0);
aluno1.adicionarNota(9.5);

const aluno2 = new Aluno("Bruno Lima", "2004-11-02", "A2024002", "Engenharia");
aluno2.adicionarNota(4.5);
aluno2.adicionarNota(5.0);
aluno2.adicionarNota(11); // deve ser rejeitada

const aluno3 = new Aluno("Carla Mendes", "2006-07-20", "A2024003", "Design");

const professor1 = new Professor("Prof. Ricardo Alves", "1980-09-10", "P1001", "Programação");

// Polimorfismo: todos os objetos são Pessoa e respondem a apresentar()
const pessoas = [aluno1, aluno2, aluno3, professor1];

pessoas.forEach((pessoa) => {
  pessoa.apresentar();
  console.log("");
});

// Verificação da herança
console.log("Verificando herança:");
console.log("aluno1 é instância de Aluno?   ", aluno1 instanceof Aluno);
console.log("aluno1 é instância de Pessoa?  ", aluno1 instanceof Pessoa);
console.log("professor1 é instância de Pessoa?", professor1 instanceof Pessoa);
console.log("professor1 é instância de Aluno? ", professor1 instanceof Aluno);