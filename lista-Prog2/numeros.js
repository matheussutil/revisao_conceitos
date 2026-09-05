function encontrarMaior(numeros) {
  return Math.max(...numeros);
}

function encontrarMenor(numeros) {
  return Math.min(...numeros);
}

function calcularMedia(numeros) {
  const soma = numeros.reduce((acc, atual) => acc + atual, 0);
  return soma / numeros.length;
}

function contarPares(numeros) {
  return numeros.filter((num) => num % 2 === 0).length;
}

function contarImpares(numeros) {
  return numeros.filter((num) => num % 2 !== 0).length;
}

function analisarNumeros(numeros) {
  const maior = encontrarMaior(numeros);
  const menor = encontrarMenor(numeros);
  const media = calcularMedia(numeros);
  const pares = contarPares(numeros);
  const impares = contarImpares(numeros);

  console.log("Lista de números:", numeros);
  console.log("Maior valor:", maior);
  console.log("Menor valor:", menor);
  console.log("Média dos valores:", media.toFixed(2));
  console.log("Quantidade de números pares:", pares);
  console.log("Quantidade de números ímpares:", impares);
}

const listaDeNumeros = [10, 5, 8, 3, 22, 7, 14, 1, 19, 6];
analisarNumeros(listaDeNumeros);
