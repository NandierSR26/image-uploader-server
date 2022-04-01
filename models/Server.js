const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT;

        this.paths = {
            uploads: '/'
        }

        this.middlewares();

        this.routes()
    }

    middlewares(){
        // CORS
        this.app.use(cors(corsOptions))

        // parseo y lectura del body
        this.app.use(express.json())

        // directorio publico
        this.app.use( express.static('public') );

        // carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true
        }));
    }

    routes(){
        this.app.use(this.paths.uploads, require('../routes/index'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor correindo en el puerto ', this.port);
        })
    }

}

const whiteList = ['http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        const existe = whiteList.some(dominio => dominio === origin);
        if (existe) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

module.exports = Server;