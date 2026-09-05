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


let pilhaHistorico = [];

function visitarPagina(pilha, url) {
  pilha.push(url);
  return pilha;
}


function paginaAtual(pilha) {
  if (pilha.length === 0) {
    return null;
  }
  return pilha[pilha.length - 1];
}


function voltarPagina(pilha) {
  if (pilha.length <= 1) {
    return { sucesso: false, mensagem: "Não há páginas anteriores no histórico." };
  }
  const paginaRemovida = pilha.pop();
  return { sucesso: true, paginaRemovida, novaAtual: paginaAtual(pilha) };
}


function exibirHistorico(pilha) {
  return [...pilha];
}



function exibirMenu() {
  console.log("\n===== Histórico de Navegação (Pilha) =====");
  console.log("1. Visitar nova página");
  console.log("2. Ver página atual");
  console.log("3. Voltar para página anterior");
  console.log("4. Exibir histórico completo");
  console.log("0. Encerrar");
  console.log("===========================================");
}

async function handleVisitar() {
  const url = await perguntar("Digite a URL da página: ");
  if (url === "") {
    console.log(" A URL não pode estar vazia.");
    return;
  }
  visitarPagina(pilhaHistorico, url);
  console.log(`Página visitada: ${url}`);
}

function handlePaginaAtual() {
  const atual = paginaAtual(pilhaHistorico);
  if (atual === null) {
    console.log("Nenhuma página visitada ainda.");
    return;
  }
  console.log(`Página atual: ${atual}`);
}

function handleVoltar() {
  const resultado = voltarPagina(pilhaHistorico);
  if (!resultado.sucesso) {
    console.log(resultado.mensagem);
    return;
  }
  console.log(`Saiu de "${resultado.paginaRemovida}". Página atual agora: "${resultado.novaAtual}"`);
}

function handleExibirHistorico() {
  const historico = exibirHistorico(pilhaHistorico);
  if (historico.length === 0) {
    console.log("Histórico vazio.");
    return;
  }
  console.log("\n--- Histórico (do mais antigo ao mais recente) ---");
  historico.forEach((url, indice) => {
    const marcador = indice === historico.length - 1 ? " <- atual" : "";
    console.log(`${indice + 1}. ${url}${marcador}`);
  });
}



async function iniciarNavegador() {
  console.log("Simulador de Histórico de Navegação");

  while (true) {
    exibirMenu();
    const opcao = await perguntar("Escolha uma opção: ");

    switch (opcao) {
      case "1":
        await handleVisitar();
        break;
      case "2":
        handlePaginaAtual();
        break;
      case "3":
        handleVoltar();
        break;
      case "4":
        handleExibirHistorico();
        break;
      case "0":
        console.log("Encerrando o simulador. Até logo!");
        rl.close();
        return;
      default:
        console.log("Opção inválida. Tente novamente.");
    }
  }
}

iniciarNavegador();