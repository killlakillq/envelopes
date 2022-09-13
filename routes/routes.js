const express = require('express');
const router = express.Router();
const { getEnvelopes, getEnvelopesById, createNewEnvelope } = require('../controllers/envelopes.js');

router.get('/', getEnvelopes);
router.get('/:id', getEnvelopesById);
router.post('/:id', createNewEnvelope);

module.exports = router;