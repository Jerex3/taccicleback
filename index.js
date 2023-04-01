const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const auth = require('./src/routes/auth');
const user = require('./src/routes/user');
const app = express();


app.use(bodyParser.json());

app.use(cors());
app.use( fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/',
  createParentPath: true
}));
app.use('/api', auth);
app.use('/api', user);

app.use((err, req, res, next) => {

    const code = err.code ?? 500;
     console.log(err);
     console.log("wenas?")
    res.status(code).send({message:`${err.message}`});
});


// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});

