const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Brasil123#@!',
    database: 'ocamento'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    } else {
        console.log('Conectado ao MySQL');
    }
});

// Criação da tabela se não existir
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS despesa (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ano INT(11) NOT NULL,
        dia INT(11) NOT NULL,
        tipo INT(11) NOT NULL,
        descricao VARCHAR(255) NOT NULL,
        valor FLOAT NOT NULL
    )
`;
connection.query(createTableQuery, (err) => {
    if (err) {
        console.error('Erro ao criar tabela:', err);
    } else {
        console.log('Tabela criada ou já existente');
    }
});

app.use(bodyParser.json());

// Rota para salvar dados no MySQL
app.post('/salvar-dados', (req, res) => {
    const { ano, mes, dia, tipo, descricao, valor } = req.body;

    const insertQuery = 'INSERT INTO despesa (ano, mes, dia, tipo, descricao, valor) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(insertQuery, [ano, mes, dia, tipo, descricao, valor], (err, results) => {
        if (err) {
            console.error('Erro ao salvar dados no MySQL:', err);
            res.status(500).send('Erro ao salvar dados no MySQL');
        } else {
            console.log('Dados salvos com sucesso no MySQL');
            res.status(200).json({ message: 'Dados salvos com sucesso' });
        }
    });
});

// Rota para consultar e exibir dados
app.get('/consultar-dados', (req, res) => {
    const selectQuery = 'SELECT * FROM despesa';
    connection.query(selectQuery, (err, results) => {
        if (err) {
            console.error('Erro ao consultar dados no MySQL:', err);
            res.status(500).send('Erro ao consultar dados no MySQL');
        } else {
            console.log('Dados consultados com sucesso no MySQL');
            res.status(200).json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
