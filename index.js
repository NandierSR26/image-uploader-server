const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes');
require('dotenv').config()

const app = express();

const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function (origin, callback) {
        const existe = whitelist.some(dominio => dominio === origin);
        if (existe) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

app.use(cors())

app.use(express.json())

app.use( express.static('public') );

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath : true
}))

app.use(router);


app.listen(process.env.PORT, () => {
    console.log('Servidor correindo en el puerto ', process.env.PORT);
})