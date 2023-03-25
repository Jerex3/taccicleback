const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const auth = require('./src/routes/auth');

const app = express();


app.use(bodyParser.json());

app.use(cors());

app.use('/api', auth);

app.use((err, req, res, next) => {

    const code = err.code ?? 500;

    res.status(code).send({message:`${err.message}`});
});


// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});

