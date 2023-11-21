const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Criação da conexão com o MySQL
const createConnection = async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Brasil123#@!',
        database: 'ocamento'
    });
};

// Função para executar uma query no MySQL
const executeQuery = async (query, params) => {
    const connection = await createConnection();
    const [results, fields] = await connection.execute(query, params);
    connection.end();
    return results;
};

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
executeQuery(createTableQuery, [])
    .then(() => {
        console.log('Tabela criada ou já existente');
    })
    .catch(err => {
        console.error('Erro ao criar tabela:', err);
    });

// Rota para salvar dados no MySQL
app.post('/salvar-dados', async (req, res) => {
    const { ano, mes, dia, tipo, descricao, valor } = req.body;

    const insertQuery = 'INSERT INTO despesa (ano, mes, dia, tipo, descricao, valor) VALUES (?, ?, ?, ?, ?, ?)';
    try {
        await executeQuery(insertQuery, [ano, mes, dia, tipo, descricao, valor]);
        console.log('Dados salvos com sucesso no MySQL');
        res.status(200).json({ message: 'Dados salvos com sucesso' });
    } catch (err) {
        console.error('Erro ao salvar dados no MySQL:', err);
        res.status(500).send('Erro ao salvar dados no MySQL');
    }
});

// Rota para consultar e exibir dados
app.get('/consultar-dados', async (req, res) => {
    const selectQuery = 'SELECT * FROM despesa';
    try {
        const results = await executeQuery(selectQuery, []);
        console.log('Dados consultados com sucesso no MySQL');
        res.status(200).json(results);
    } catch (err) {
        console.error('Erro ao consultar dados no MySQL:', err);
        res.status(500).send('Erro ao consultar dados no MySQL');
    }
});

// Rota para pesquisar dados
app.get('/pesquisar-dados', async (req, res) => {
    const { ano, mes, dia, tipo, descricao, valor } = req.query;
    const selectQuery = 'SELECT * FROM despesa WHERE ano = ? OR mes = ? OR dia = ? OR tipo = ? OR descricao = ? OR valor = ?';
    
    try {
        const results = await executeQuery(selectQuery, [ano, mes, dia, tipo, descricao, valor]);
        console.log('Dados pesquisados com sucesso no MySQL');
        res.status(200).json(results);
    } catch (err) {
        console.error('Erro ao pesquisar dados no MySQL:', err);
        res.status(500).send('Erro ao pesquisar dados no MySQL');
    }
});

// Rota para remover dados
app.delete('/remover-dado/:id', async (req, res) => {
    const id = req.params.id;
    const deleteQuery = 'DELETE FROM despesa WHERE id = ?';

    try {
        await executeQuery(deleteQuery, [id]);
        console.log('Dado removido com sucesso do MySQL');
        res.status(200).json({ message: 'Dado removido com sucesso' });
    } catch (err) {
        console.error('Erro ao remover dado do MySQL:', err);
        res.status(500).send('Erro ao remover dado do MySQL');
    }
});

// Rota para editar dados
app.put('/editar-dado/:id', async (req, res) => {
    const id = req.params.id;
    const { ano, mes, dia, tipo, descricao, valor } = req.body;
    const updateQuery = 'UPDATE despesa SET ano = ?, mes = ?, dia = ?, tipo = ?, descricao = ?, valor = ? WHERE id = ?';
})

// Rota para editar dados
/*app.put('/editar-dado/:id', async (req, res) => {
    const id = req.params.id;
    const { ano, mes, dia, tipo, descricao, valor } = req.body;
    const updateQuery = 'UPDATE despesa SET ano = ?, mes = ?, dia = ?, tipo = ?, descricao = ?, valor = ? WHERE id = ?';

    try {
        await executeQuery(updateQuery, [ano, mes, dia, tipo, descricao, valor, id]);
        console.log('Dado editado com sucesso no MySQL');
        res.status(200).json({ message: 'Dado editado com sucesso' });
    } catch (err) {
        console.error('Erro ao editar dado no MySQL:', err);
        res.status(500).send('Erro ao editar dado no MySQL');
    }
});*/

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});