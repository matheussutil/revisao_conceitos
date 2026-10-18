
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const entradaUsuario = rl[Symbol.asyncIterator]();


async function perguntar(pergunta) {
  process.stdout.write(pergunta);
  const { value, done } = await entradaUsuario.next();
  if (done) return "";
  return value.trim();
}


function validarNome(nome) {
  if (nome.length === 0) {
    return { valido: false, mensagem: "O nome não pode estar vazio." };
  }
  return { valido: true };
}


function validarIdade(idade) {
  const idadeNum = Number(idade);

  if (isNaN(idadeNum) || !Number.isInteger(idadeNum)) {
    return { valido: false, mensagem: "A idade deve ser um número inteiro." };
  }
  if (idadeNum < 14 || idadeNum > 120) {
    return { valido: false, mensagem: "A idade deve estar entre 14 e 120 anos." };
  }
  return { valido: true };
}


function validarEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regexEmail.test(email)) {
    return { valido: false, mensagem: "O e-mail informado não possui um formato válido." };
  }
  return { valido: true };
}


function validarSenha(senha) {
  if (senha.length < 8) {
    return { valido: false, mensagem: "A senha deve possuir pelo menos 8 caracteres." };
  }
  return { valido: true };
}


async function obterDadoValido(pergunta, funcaoValidadora) {
  while (true) {
    const valor = await perguntar(pergunta);
    const resultado = funcaoValidadora(valor);

    if (resultado.valido) {
      return valor;
    }

    console.log(resultado.mensagem);
  }
}


async function cadastrarUsuario() {
  console.log("=== Cadastro de Usuário ===\n");

  const nome = await obterDadoValido("Nome: ", validarNome);
  const idade = await obterDadoValido("Idade: ", validarIdade);
  const email = await obterDadoValido("E-mail: ", validarEmail);
  const senha = await obterDadoValido("Senha (mín. 8 caracteres): ", validarSenha);

  console.log("\n Cadastro concluído com sucesso!");
  console.log("--------------------------------");
  console.log("Nome:  ", nome);
  console.log("Idade: ", idade);
  console.log("E-mail:", email);
  console.log("Senha: ", "*".repeat(senha.length));

  rl.close();
}

cadastrarUsuario();