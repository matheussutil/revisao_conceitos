
function fibonacciRecursivo(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  return fibonacciRecursivo(n - 1) + fibonacciRecursivo(n - 2);
}

console.log(fibonacciRecursivo(10)); 

function fibonacciIterativo(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let anterior = 0;
  let atual = 1;

  for (let i = 2; i <= n; i++) {
    const proximo = anterior + atual;
    anterior = atual;
    atual = proximo;
  }

  return atual;
}

console.log(fibonacciIterativo(10)); 