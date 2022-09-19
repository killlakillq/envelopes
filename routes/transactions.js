const express = require('express');
const transactionsRouter = express.Router();
const { getTransactions, getTransactionsById, updateTransactions, deleteTransactions } = require('../controllers/transactions.js');

transactionsRouter.get('/transactions/all', getTransactions);
transactionsRouter.get('/transactions/:id', getTransactionsById);
transactionsRouter.put('/transactions/:id', updateTransactions);
transactionsRouter.delete('/transactions/:id', deleteTransactions);

module.exports = transactionsRouter;