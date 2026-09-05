
// recusiva
function fatorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }

  if (n < 0) {
    throw new Error("O fatorial não é definido para números negativos.");
  }

  return n * fatorial(n - 1);
}

// Exemplos de uso
console.log(fatorial(5)); 
console.log(fatorial(0));
console.log(fatorial(1)); 
console.log(fatorial(7)); 

/*Nao recursiva
function fatorialIterativo(n) {
  if (n < 0) {
    throw new Error("O fatorial não é definido para números negativos.");
  }

  let resultado = 1;

  for (let i = 2; i <= n; i++) {
    resultado *= i;
  }

  return resultado;
}

console.log(fatorialIterativo(5)); 
console.log(fatorialIterativo(0)); 
*/ 