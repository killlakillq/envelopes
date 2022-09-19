const express = require('express');
const envelopesRouter = express.Router();
const { getEnvelopes, getEnvelopesById, createNewEnvelopes, updateEnvelopes, deleteEnvelopes, addEnvelopeTransaction, getEnvelopeTransactions } = require('../controllers/envelopes.js');

envelopesRouter.get('/', getEnvelopes);
envelopesRouter.get('/:id', getEnvelopesById);
envelopesRouter.post('/:id', createNewEnvelopes);
envelopesRouter.put('/:id', updateEnvelopes);
envelopesRouter.delete('/:id', deleteEnvelopes);
envelopesRouter.post('/envelope/:id/transaction', addEnvelopeTransaction);
envelopesRouter.get('/envelope/:id/transaction', getEnvelopeTransactions);

module.exports = envelopesRouter;