
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


function somar(a, b) {
  return { sucesso: true, resultado: a + b };
}

function subtrair(a, b) {
  return { sucesso: true, resultado: a - b };
}

function multiplicar(a, b) {
  return { sucesso: true, resultado: a * b };
}

function dividir(a, b) {
  if (b === 0) {
    return { sucesso: false, mensagem: "Erro: divisão por zero não é permitida." };
  }
  return { sucesso: true, resultado: a / b };
}

function potencia(a, b) {
  return { sucesso: true, resultado: Math.pow(a, b) };
}

function resto(a, b) {
  if (b === 0) {
    return { sucesso: false, mensagem: "Erro: não é possível calcular o resto com divisor zero." };
  }
  return { sucesso: true, resultado: a % b };
}


const operacoes = {
  1: { nome: "Soma", simbolo: "+", funcao: somar },
  2: { nome: "Subtração", simbolo: "-", funcao: subtrair },
  3: { nome: "Multiplicação", simbolo: "*", funcao: multiplicar },
  4: { nome: "Divisão", simbolo: "/", funcao: dividir },
  5: { nome: "Potência", simbolo: "^", funcao: potencia },
  6: { nome: "Resto da divisão", simbolo: "%", funcao: resto },
};

function exibirMenu() {
  console.log("\n===== Calculadora Modular =====");
  for (const [chave, op] of Object.entries(operacoes)) {
    console.log(`${chave}. ${op.nome} (${op.simbolo})`);
  }
  console.log("0. Encerrar");
  console.log("================================");
}

async function lerNumero(pergunta) {
  while (true) {
    const entrada = await perguntar(pergunta);
    const numero = Number(entrada);

    if (entrada.trim() === "" || isNaN(numero)) {
      console.log("Valor inválido. Digite um número.");
      continue;
    }
    return numero;
  }
}

async function executarOperacao(opcao) {
  const operacao = operacoes[opcao];

  const a = await lerNumero("Digite o primeiro número: ");
  const b = await lerNumero("Digite o segundo número: ");

  const { sucesso, resultado, mensagem } = operacao.funcao(a, b);

  if (!sucesso) {
    console.log(mensagem);
    return;
  }

  console.log(` Resultado: ${a} ${operacao.simbolo} ${b} = ${resultado}`);
}


async function iniciarCalculadora() {
  console.log("Bem-vindo(a) à Calculadora Modular!");

  while (true) {
    exibirMenu();
    const opcao = await perguntar("Escolha uma opção: ");

    if (opcao === "0") {
      console.log("Encerrando a calculadora. Até logo!");
      break;
    }

    if (!operacoes[opcao]) {
      console.log("  Opção inválida. Tente novamente.");
      continue;
    }

    await executarOperacao(opcao);
  }

  rl.close();
}

iniciarCalculadora();