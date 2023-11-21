const botao = document.querySelector('#cadastrar_despesas')

botao.addEventListener('click', ()=>{
    let ano = document.querySelector('#ano').value
    let mes = document.querySelector('#mes').value
    let dia = document.querySelector('#dia').value
    let tipo = document.querySelector('#tipo').value
    let descricao = document.querySelector('#descricao').value
    let valor = document.querySelector('#valor').value

    let dados = {
        ano: ano,
        mes: mes,
        dia: dia,
        tipo: tipo,
        descricao: descricao,
        valor: valor
    };

    function validarDados(dados) {
        for(let i in dados) {
            if(dados[i] === undefined || dados[i] === '' || dados[i] === null) {
                return `O campo ${i} não foi preenchido.`;
            }
        }
        return true
    }

    if(validarDados(dados)) {
        fetch('http://localhost:3000/salvar-dados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {

        console.log('Dados enviados com sucesso:', data)

        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal-cor-titulo').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa cadastrada com sucesso!'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-success'

        //dialog de sucesso
        $('#modalRegistroDespesa').modal('show')

        document.querySelector('#ano').value = '';
        document.querySelector('#mes').value = '';
        document.querySelector('#dia').value = '';
        document.querySelector('#tipo').value = '';
        document.querySelector('#descricao').value = '';
        document.querySelector('#valor').value = '';

    })
    .catch(error => {
        console.error('Erro ao enviar dados:', error)

        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('modal-cor-titulo').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'

        //dialog de erro
        $('#modalRegistroDespesa').modal('show')
    });
    }

})



