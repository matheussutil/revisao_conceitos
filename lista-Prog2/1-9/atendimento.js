
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


let filaAtendimento = [];
let proximaSenha = 1;


function adicionarPessoa(fila, nome) {
  const pessoa = {
    senha: proximaSenha,
    nome,
    horarioEntrada: new Date().toLocaleTimeString("pt-BR"),
  };
  fila.push(pessoa);
  proximaSenha++;
  return pessoa;
}


function chamarProximo(fila) {
  if (fila.length === 0) {
    return { sucesso: false, mensagem: "Não há ninguém aguardando na fila." };
  }
  const pessoa = fila.shift();
  return { sucesso: true, pessoa };
}


function consultarProximo(fila) {
  if (fila.length === 0) {
    return null;
  }
  return fila[0];
}


function mostrarFila(fila) {
  return [...fila];
}


function contarAguardando(fila) {
  return fila.length;
}



function exibirMenu() {
  console.log("\n===== Sistema de Atendimento (Fila) =====");
  console.log("1. Adicionar pessoa à fila");
  console.log("2. Chamar próxima pessoa");
  console.log("3. Consultar quem será o próximo");
  console.log("4. Mostrar fila completa");
  console.log("5. Quantidade de pessoas aguardando");
  console.log("0. Encerrar");
  console.log("==========================================");
}

async function handleAdicionar() {
  const nome = await perguntar("Nome da pessoa: ");
  if (nome === "") {
    console.log(" O nome não pode estar vazio.");
    return;
  }
  const pessoa = adicionarPessoa(filaAtendimento, nome);
  console.log(
    `Senha ${pessoa.senha} gerada para ${pessoa.nome} (entrada: ${pessoa.horarioEntrada})`
  );
}

function handleChamarProximo() {
  const resultado = chamarProximo(filaAtendimento);
  if (!resultado.sucesso) {
    console.log(resultado.mensagem);
    return;
  }
  const { senha, nome, horarioEntrada } = resultado.pessoa;
  console.log(`Chamando senha ${senha} - ${nome} (entrada: ${horarioEntrada})`);
}

function handleConsultarProximo() {
  const proximo = consultarProximo(filaAtendimento);
  if (!proximo) {
    console.log("Não há ninguém aguardando.");
    return;
  }
  console.log(`Próximo a ser chamado: Senha ${proximo.senha} - ${proximo.nome}`);
}

function handleMostrarFila() {
  const fila = mostrarFila(filaAtendimento);
  if (fila.length === 0) {
    console.log("A fila está vazia.");
    return;
  }
  console.log("\n--- Fila de Atendimento (ordem de chegada) ---");
  fila.forEach((pessoa, indice) => {
    const marcador = indice === 0 ? " <- próximo" : "";
    console.log(`${indice + 1}. Senha ${pessoa.senha} - ${pessoa.nome} (entrada: ${pessoa.horarioEntrada})${marcador}`);
  });
}

function handleContarAguardando() {
  console.log(`Pessoas aguardando: ${contarAguardando(filaAtendimento)}`);
}



async function iniciarSistema() {
  console.log("Bem-vindo(a) ao Sistema de Atendimento!");

  while (true) {
    exibirMenu();
    const opcao = await perguntar("Escolha uma opção: ");

    switch (opcao) {
      case "1":
        await handleAdicionar();
        break;
      case "2":
        handleChamarProximo();
        break;
      case "3":
        handleConsultarProximo();
        break;
      case "4":
        handleMostrarFila();
        break;
      case "5":
        handleContarAguardando();
        break;
      case "0":
        console.log("Encerrando o sistema de atendimento. Até logo!");
        rl.close();
        return;
      default:
        console.log("Opção inválida. Tente novamente.");
    }
  }
}

iniciarSistema();