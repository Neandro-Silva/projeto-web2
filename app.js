/*
const express = require('express')
const app = express();
const porta = 3000;
const User = require('./models/User') 

app.use(express.json())

app.get("/", async (req, res) => {
    //res.send("Pagina inicial - teste")
    res.sendFile(__dirname + "/src/index.html")
})

app.get("/consulta", async (req, res) => {
    res.send.sendFile(__dirname + "/src/consulta.html")
})

app.post("/cadastrar", async (req, res) => {
    //console.log(req.body)

    await User.create(req.body)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuario cadastrado com sucesso!"
        })
    }).catch(() => {
        return res.status(400).json({
            erro: false,
            mensagem: "Erro: Usuario não cadastrado com sucesso!"
        })
    })

    //res.send("Pagina cadastrar")
})

app.listen(porta, () => {
    console.log(`Servidor iniciado na porta ${porta}: http://localhost:3000`)
})*/

const mysql = require('mysql2/promise');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.get("/", async (req, res) => {
    //res.send("Pagina inicial - teste")
    res.sendFile(__dirname + "/src/index.html")
})

app.get("/c", async (req, res) => {
    res.sendFile(__dirname + "/src/consulta.html")
})

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
                'INSERT INTO despesa (ano, mes, dia, tipo, descricao, valor) VALUES (?, ?, ?, ?, ?, ?)',
                [d.ano, d.mes, d.dia, d.tipo, d.descricao, d.valor]
            );
            console.log('Despesa salva com sucesso.');
        } catch (error) {
            console.error('Erro ao salvar despesa:', error);
        }
    }

    async recuperarTodosRegistros() {
        try {
            const [rows, fields] = await this.connection.execute('SELECT * FROM despesa');
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


app.post('/add-despesa', (req, res) => {
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