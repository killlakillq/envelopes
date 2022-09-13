const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/routes.js'); 

app.use(bodyParser.json());


app.use('/', router);


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    try {
        console.log(`Server listening to ${PORT}...`);
    }
    catch (err) {
        console.log(err);
    }
});