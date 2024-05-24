const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Caio',
    password: 'SENAI123',
    database: 'login'
});


db.connect((error) => {
    if (error) {
        console.log("Erro ao contectar com o Banco de Dados")
    } else {
        console.log("Conectado ao MySQL")
    }
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.use(bodyParser.urlencoded({ extended: true }));


// LOGIN
app.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password


    
        db.query('select password from user where username= ?', [username], (error, results) => {
            if (results.length>0) {
            const passwordBD = results[0].password;
            if (passwordBD === password) {
                console.log('Senha correta!');
                res.sendFile(__dirname + '/pagina.html')
            } else {
                console.log('Senha incorreta!');
                res.sendFile(__dirname + '/erro.html')
            };

        } else {
            console.log('Usuario não cadastrado!');
        }
    })
});


app.get("/cadastro", (req, res) => {
    res.sendFile(__dirname + '/cadastro.html');
    
});

app.post("/registro", (req, res) => {
    const user = req.body.username;
    const password = req.body.password;
    const confirm = req.body.confirmSenha;


    if (password !== confirm) {   

    db.query('INSERT INTO User (username, password) VALUES (?, ?)', [user, password], (error, results) => {
        if (error) {
            console.error("Erro ao inserir usuário no banco de dados:", error);
        } else {
            console.log('Usuário cadastrado com sucesso!');
            return res.sendFile(__dirname + '/index.html');
        }
    });
    }else{
        console.log('Senhas Divergentes')
    }
});


app.listen(port, () => {
    console.log(`Servidor rodando no endereço: http://localhost:${port}`)
})

