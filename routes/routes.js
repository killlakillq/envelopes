const express = require('express');
const router = express.Router();
const { getEnvelopes, getEnvelopesById, createNewEnvelope, updateEnvelope, deleteEnvelopes, transfer } = require('../controllers/envelopes.js');

router.get('/', getEnvelopes);
router.get('/:id', getEnvelopesById);
router.post('/:id', createNewEnvelope);
router.put('/:id', updateEnvelope);
router.delete('/:id', deleteEnvelopes);
router.post('/:from/:to', transfer);

module.exports = router;