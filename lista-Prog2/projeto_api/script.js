const botao = document.getElementById("buscar");

const resultado = document.getElementById("resultado");

botao.addEventListener("click", async function() {

    botao.disabled = true;
    botao.textContent = "Carregando";

    try {

        console.log("Buscando personagens...");

        const resposta = await fetch(
            "https://rickandmortyapi.com/api/character"
        );

        console.log("Código HTTP:", resposta.status);

        if (!resposta.ok) {
            throw new Error("Erro na requisição HTTP: " + resposta.status);
        }

        const dados = await resposta.json();

        resultado.innerHTML = "";

        dados.results.slice(0, 5).forEach(function(personagem) {

            resultado.innerHTML += `
                <div class="personagem">
                    <h2>${personagem.name}</h2>
                    <img src="${personagem.image}" width="150">
                    <p>Espécie: ${personagem.species}</p>
                    <p>Status: ${personagem.status}</p>
                </div>
            `;

        });

    } catch (erro) {

        console.log("Ocorreu um erro:", erro.message);

        resultado.innerHTML = "<p>Não foi possível carregar os personagens. Tente novamente.</p>";

    } finally {
    botao.disabled = false;
    botao.textContent = "Buscar Personagens";
}

});

