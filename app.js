const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const envelopesRouter = require('./routes/envelopes.js'); 
const transactionsRouter = require('./routes/transactions.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.use('/', envelopesRouter);
app.use('/', transactionsRouter);


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is listening to ${PORT}...`);
});