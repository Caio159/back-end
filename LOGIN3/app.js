const express =  require('express');
const bodyParser = require('body-parser');

   const mysql = require('mysql2');

const app = express();
const port = 3000;


const db = mysql.createConnection({
    host:'localhost',
    user:'Caio',
    password:'SENAI123',
    database: 'login'
})

db.connect((error)=>{
    if (error){
        console.log('Erro ao conectar com o MySQL')
    }else{
        console.log('Conectado')
    }
})

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.post("/login", (req, res)=>{
const username = req.body.usuario
const password = req.body.senha


db.query('SELECT password FROM user WHERE username = ?', [username], (error, results)=>{
    if (results.length > 0){
                const passowordDB = results[0].password;
                if(password == passowordDB) {
                    res.sendFile(__dirname + '/pagina.html')
                }else{
                    res.send(__dirname + '/erro.html' )
                }
    }else{
        res.sendFile(__dirname + '/erro.html')
        console.log('Usuario não cadastrado!')
    }
})

console.log(username)
console.log(password)

})

app.get("/cadastro", (req, res)=>{
    res.sendFile(__dirname + '/cadastro.html')
})


app.listen(port, ()=> {
    console.log(`Servidor rodando no endereço: http://localhost:${port}`)
})

