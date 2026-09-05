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


let tarefas = [];
let proximoId = 1;



function adicionarTarefa(descricao) {
  const novaTarefa = { id: proximoId, descricao };
  tarefas.push(novaTarefa);
  proximoId++;
  return novaTarefa;
}

function listarTarefas() {
  return [...tarefas]; 
}

function buscarTarefa(id) {
  return tarefas.find((tarefa) => tarefa.id === id) || null;
}

function alterarTarefa(id, novaDescricao) {
  const tarefa = buscarTarefa(id);
  if (!tarefa) {
    return { sucesso: false, mensagem: "Tarefa não encontrada." };
  }
  tarefa.descricao = novaDescricao;
  return { sucesso: true, tarefa };
}

function removerTarefa(id) {
  const indice = tarefas.findIndex((tarefa) => tarefa.id === id);
  if (indice === -1) {
    return { sucesso: false, mensagem: "Tarefa não encontrada." };
  }
  const [removida] = tarefas.splice(indice, 1);
  return { sucesso: true, tarefa: removida };
}

function contarTarefas() {
  return tarefas.length;
}



function exibirMenu() {
  console.log("\n===== Gerenciador de Tarefas =====");
  console.log("1. Adicionar tarefa");
  console.log("2. Listar tarefas");
  console.log("3. Buscar tarefa");
  console.log("4. Alterar tarefa");
  console.log("5. Remover tarefa");
  console.log("6. Quantidade total de tarefas");
  console.log("0. Encerrar");
  console.log("===================================");
}

async function handleAdicionar() {
  const descricao = await perguntar("Descrição da tarefa: ");
  if (descricao === "") {
    console.log("A descrição não pode estar vazia.");
    return;
  }
  const tarefa = adicionarTarefa(descricao);
  console.log(`Tarefa adicionada (ID ${tarefa.id}): "${tarefa.descricao}"`);
}

function handleListar() {
  const lista = listarTarefas();
  if (lista.length === 0) {
    console.log("Nenhuma tarefa cadastrada.");
    return;
  }
  console.log("\n--- Lista de Tarefas ---");
  lista.forEach((tarefa) => {
    console.log(`[${tarefa.id}] ${tarefa.descricao}`);
  });
}

async function handleBuscar() {
  const idTexto = await perguntar("Digite o ID da tarefa: ");
  const id = Number(idTexto);

  if (isNaN(id)) {
    console.log("ID inválido.");
    return;
  }

  const tarefa = buscarTarefa(id);
  if (!tarefa) {
    console.log("Tarefa não encontrada.");
    return;
  }
  console.log(`Encontrada: [${tarefa.id}] ${tarefa.descricao}`);
}

async function handleAlterar() {
  const idTexto = await perguntar("Digite o ID da tarefa a alterar: ");
  const id = Number(idTexto);

  if (isNaN(id)) {
    console.log("ID inválido.");
    return;
  }

  const novaDescricao = await perguntar("Nova descrição: ");
  if (novaDescricao === "") {
    console.log("A descrição não pode estar vazia.");
    return;
  }

  const resultado = alterarTarefa(id, novaDescricao);
  if (!resultado.sucesso) {
    console.log(resultado.mensagem);
    return;
  }
  console.log(`Tarefa atualizada: [${resultado.tarefa.id}] ${resultado.tarefa.descricao}`);
}

async function handleRemover() {
  const idTexto = await perguntar("Digite o ID da tarefa a remover: ");
  const id = Number(idTexto);

  if (isNaN(id)) {
    console.log("ID inválido.");
    return;
  }

  const resultado = removerTarefa(id);
  if (!resultado.sucesso) {
    console.log(resultado.mensagem);
    return;
  }
  console.log(`Tarefa removida: [${resultado.tarefa.id}] ${resultado.tarefa.descricao}`);
}

function handleContar() {
  console.log(`Total de tarefas cadastradas: ${contarTarefas()}`);
}


async function iniciarGerenciador() {
  console.log("Bem-vindo(a) ao Gerenciador de Tarefas!");

  while (true) {
    exibirMenu();
    const opcao = await perguntar("Escolha uma opção: ");

    switch (opcao) {
      case "1":
        await handleAdicionar();
        break;
      case "2":
        handleListar();
        break;
      case "3":
        await handleBuscar();
        break;
      case "4":
        await handleAlterar();
        break;
      case "5":
        await handleRemover();
        break;
      case "6":
        handleContar();
        break;
      case "0":
        console.log("Encerrando o gerenciador de tarefas. Até logo!");
        rl.close();
        return;
      default:
        console.log("Opção inválida. Tente novamente.");
    }
  }
}

iniciarGerenciador();