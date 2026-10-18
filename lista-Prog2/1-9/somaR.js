function somaRecursiva(lista) {
  if (lista.length === 0) {
    return 0;
  }

  const [primeiro, ...resto] = lista;
  return primeiro + somaRecursiva(resto);
}

console.log(somaRecursiva([10, 20, 5, 3])); 
console.log(somaRecursiva([]));             
console.log(somaRecursiva([7]));            