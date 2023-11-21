const botaoPesquisar = document.querySelector('#pesquisar_despesas');

// Adicionar um ouvinte de evento de clique ao botão de pesquisa
botaoPesquisar.addEventListener('click', () => {
    // Obter os valores dos campos de pesquisa
    let anoPesquisa = document.querySelector('#ano_pesquisa').value;
    let mesPesquisa = document.querySelector('#mes_pesquisa').value;
    let diaPesquisa = document.querySelector('#dia_pesquisa').value;
    let tipoPesquisa = document.querySelector('#tipo_pesquisa').value;
    let descricaoPesquisa = document.querySelector('#descricao_pesquisa').value;
    let valorPesquisa = document.querySelector('#valor_pesquisa').value;

    // Construir o objeto de pesquisa
    let pesquisa = {
        ano: anoPesquisa,
        mes: mesPesquisa,
        dia: diaPesquisa,
        tipo: tipoPesquisa,
        descricao: descricaoPesquisa,
        valor: valorPesquisa
    };

    // Função para validar dados de pesquisa
    function validarDadosPesquisa(pesquisa) {
        for (let i in pesquisa) {
            if (pesquisa[i] !== undefined && pesquisa[i] !== '') {
                return true;
            }
        }
        return false;
    }

    // Verificar se pelo menos um campo de pesquisa foi preenchido
    if (validarDadosPesquisa(pesquisa)) {
        // Enviar solicitação de pesquisa para o servidor
        fetch('http://localhost:3000/pesquisar-dados', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
})