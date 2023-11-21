document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000/consultar-dados')
        .then(response => response.json())
        .then(data => exibirDados(data))
        .catch(error => console.error('Erro ao obter dados:', error));
});

function exibirDados(dados) {
    let dadosLista = document.getElementById('dadosLista');
    dadosLista.innerHTML = '';

    dados.forEach(dado => {
        let linha = dadosLista.insertRow();

        linha.insertCell(0).innerHTML = `${dado.dia}/${dado.mes}/${dado.ano}`;

        switch(String(dado.tipo)) {
            case '1': dado.tipo = 'Alimentação'; 
                break;
            case '2': dado.tipo = 'Educação'; 
                break;
            case '3': dado.tipo = 'Lazer'; 
                break;
            case '4': dado.tipo = 'Saúde'; 
                break;
            case '5': dado.tipo = 'Transporte'; 
                break;
        }

        linha.insertCell(1).innerHTML = dado.tipo; 
        linha.insertCell(2).innerHTML = dado.descricao;
        linha.insertCell(3).innerHTML = dado.valor;

        

        // Criar botão de editar
        let btnEditar = document.createElement('button');
        btnEditar.className = 'btn btn-outline-primary';
        btnEditar.innerHTML = '<i class="fas fa-edit"></i>';
        btnEditar.onclick = function() { 
            // Editar a despesa 
            
            editarDado(linha, dado);
        };
        linha.insertCell(4).append(btnEditar);

        // Criar botão de exclusão
        let btnExcluir = document.createElement('button');
        btnExcluir.className = 'btn btn-outline-danger';
        btnExcluir.innerHTML = '<i class="fas fa-times"></i>';
        btnExcluir.onclick = function() { 
            // Remover a despesa 
            let id = dado.id;
            removerDado(id);
        };
        linha.insertCell(5).append(btnExcluir);
    });
}

function removerDado(id) {
    fetch(`http://localhost:3000/remover-dado/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao remover dado');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dado removido com sucesso:', data);
        // Atualizar a interface ou recarregar a página, se necessário
        window.location.reload();
    })
    .catch(error => console.error('Erro ao remover dado:', error));
}


function editarDado(linha, dado) {
    // Substituir os campos da linha por inputs com os valores atuais
    for (let i = 1; i < linha.cells.length - 1; i++) {
        let valorAtual = linha.cells[i].innerText;
        linha.cells[i].innerHTML = `<input type="text" value="${valorAtual}">`;
    }

    // Adicionar um botão "Salvar" para confirmar as alterações
    let btnSalvar = document.createElement('button');
    btnSalvar.className = 'btn btn-outline-success';
    btnSalvar.innerHTML = '<i class="fas fa-check"></i>';
    btnSalvar.onclick = function() {
        // Implementar a lógica para salvar as alterações
        let novosValores = {};
        for (let i = 1; i < linha.cells.length - 1; i++) {
            let novoValor = linha.cells[i].querySelector('input').value;
            `novosValores[campo${i}] = novoValor`;
        }

        salvarEdicao(dado.id, novosValores);
    };
    linha.insertCell(linha.cells.length).append(btnSalvar);
}

function salvarEdicao(id, novosValores) {
    fetch(`http://localhost:3000/editar-dado/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novosValores),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao salvar edição');
        }
        return response.json();
    })
    .then(data => {
        console.log('Edição salva com sucesso:', data);
        // Atualizar a interface ou recarregar a página, se necessário
        window.location.reload();
    })
    .catch(error => console.error('Erro ao salvar edição:', error));
}