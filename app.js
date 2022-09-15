const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/routes.js'); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.use('/', router);


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    try {
        console.log(`Server is listening to ${PORT}...`);
    }
    catch (err) {
        console.log(err);
    }
});