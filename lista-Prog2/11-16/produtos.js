class Produto {
    constructor(codigo, nome, preco, estoque) {
        this.codigo = codigo;
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }
    addToEstoque(quantidade) {
        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            console.log("Valor de quantidade inválido.");
            return false;
        }
        this.estoque += quantidade;
        console.log(`${quantidade} unidades adicionadas a ${this.nome}. Estoque atual ${this.estoque}`);
        return true;
    }
    removeEstoque(quantidade) {
        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            console.log("Valor de quantidade inválido.");
            return false;
        }
        if (quantidade > this.estoque) {
            console.log(
                `Estoque insuficiente de "${this.nome}": tentou retirar ${quantidade}, mas só há ${this.estoque}.`
            );
            return false;
        }
        this.estoque -= quantidade;
        console.log(`${quantidade} unidades adicionadas a ${this.nome}. Estoque atual ${this.estoque}`);
        return true;

    }
    altPreco(novoPreco) {
        if (typeof novoPreco !== "number" || isNaN(novoPreco) || novoPreco < 0) {
            console.log("O preço deve ser um número não negativo.");
            return false;
        }
        this.preco = novoPreco;
        console.log(`Preço de "${this.nome}" alterado para ${this.preco}`);
        return true;
    }
    valorTotal() {
        return this.preco * this.estoque;
    }
    infoProduto() {
        console.log(
            `[${this.codigo}] ${this.nome} | Preço: ${this.preco} | ` +
            `Estoque: ${this.quantidadeEstoque} | Valor total: ${this.valorTotal()}`
        );
    }
}
