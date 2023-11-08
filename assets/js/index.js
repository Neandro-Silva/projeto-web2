
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Brasil123#@!',
    database: 'ocamento'
});

connection.connect(err => {
    if (err) {
        console.error('Erro na conexão com o MySQL:', err);
        return;
    }
    console.log('Conexão com o MySQL estabelecida');
});

app.post('/salvar-dados', (req, res) => {
    const ano = req.body.ano;
    const mes = req.body.mes;
    const dia = req.body.dia;
    const tipo = req.body.tipo;
    const descricao = req.body.descricao;
    const valor = req.body.valor;

    const sql = 'INSERT INTO despesa (ano, mes, dia, tipo, descricao, valor) VALUES (?, ?, ?, ?, ?, ?)';

    connection.query(sql, [ano, mes, dia, tipo, descricao, valor], (err, result) => {
        if (err) {
            console.error('Erro ao inserir no banco de dados:', err);
            res.send('Erro ao salvar os dados');
        } else {
            console.log('Dados salvos no banco de dados');
            res.send('Dados salvos com sucesso');
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor em execução na porta 3000');
});

/*************************************************/ /*outro código diferente para testar no app.js/*************************************************/

const mysql = require('mysql2/promise');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

class Despesa {
    // 
}

class Bd {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Brasil123#@!',
            database: 'ocamento'
        });
    }

    async gravar(d) {
        try {
            const [rows, fields] = await this.connection.execute(
                'INSERT INTO Despesa (Ano, Mes, Dia, Tipo, Descricao, Valor) VALUES (?, ?, ?, ?, ?, ?)',
                [d.ano, d.mes, d.dia, d.tipo, d.descricao, d.valor]
            );
            console.log('Despesa salva com sucesso.');
        } catch (error) {
            console.error('Erro ao salvar despesa:', error);
        }
    }

    async recuperarTodosRegistros() {
        try {
            const [rows, fields] = await this.connection.execute('SELECT * FROM Despesa');
            const despesas = rows.map(row => ({
                ano: row.ano,
                mes: row.mes,
                dia: row.dia,
                tipo: row.tipo,
                descricao: row.descricao,
                valor: row.valor,
                id: row.id
            }));
            return despesas;
        } catch (error) {
            console.error('Erro ao recuperar despesas:', error);
            return [];
        }
    }

    
}

const bd = new Bd();


app.post('/add-expense', (req, res) => {
    const { ano, mes, dia, tipo, descricao, valor } = req.body;
    const despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);
    if (despesa.validarDados()) {
        bd.gravar(despesa);
        res.status(200).json({ message: 'Despesa salva com sucesso' });
    } else {
        res.status(400).json({ message: 'Dados de despesas inválidos' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});

