const Sequilize = require('sequelize');
const db = require('./db');

const User = db.define('teste3', {
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequilize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequilize.STRING,
        allowNull: false
    }  
});

//riar tabela quando não existir
//User.sync();
//verificar se há alguma diferença na tabela, realiza alterações
//User.sync({alert: true})

module.exports = User;