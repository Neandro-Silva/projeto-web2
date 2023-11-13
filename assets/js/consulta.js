document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000/consultar-dados')
        .then(response => response.json())
        .then(data => exibirDados(data))
        .catch(error => console.error('Erro ao obter dados:', error));
});



function exibirDados(dados) {
    const dadosLista = document.getElementById('dadosLista');

    // Criar tabela
    const tabela = document.createElement('table');
    tabela.border = '1';

    // Cabeçalho da tabela
    const cabecalho = tabela.createTHead();
    const cabecalhoLinha = cabecalho.insertRow();
    const cabecalhoColuna1 = cabecalhoLinha.insertCell(0);
    const cabecalhoColuna2 = cabecalhoLinha.insertCell(1);
    const cabecalhoColuna3 = cabecalhoLinha.insertCell(2);
    const cabecalhoColuna4 = cabecalhoLinha.insertCell(3);
    const cabecalhoColuna5 = cabecalhoLinha.insertCell(4);
    const cabecalhoColuna6 = cabecalhoLinha.insertCell(5);
   

    // Corpo da tabela
    const corpo = tabela.createTBody();
    dados.forEach(dado => {
        const linha = corpo.insertRow();
        const coluna1 = linha.insertCell(0);
        const coluna2 = linha.insertCell(1);
        const coluna3 = linha.insertCell(2);
        const coluna4 = linha.insertCell(3);
        const coluna5 = linha.insertCell(4);
        const coluna6 = linha.insertCell(5);
        const coluna7 = linha.insertCell(5);
        coluna1.textContent = dado.id;
        coluna2.textContent = dado.ano;
        coluna3.textContent = dado.dia;
        coluna4.textContent = dado.mes;
        coluna5.textContent = dado.tipo;
        coluna6.textContent = dado.descricao;
        coluna7.textContent = dado.valor;
    });

    dadosLista.appendChild(tabela);
}
