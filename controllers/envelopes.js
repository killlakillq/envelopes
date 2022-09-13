const express = require('express');
const dbEnvelopes = require('../helpers/db.json');

exports.getEnvelopes = async (req, res) => {
    try { 
        const envelopes = await dbEnvelopes;
        res.status(200).send(envelopes);
    }
    catch (err) {
        res.status(400).send(err);
    }
};

exports.getEnvelopesById = async (req, res) => {
    try {
        const reqParams = req.params.id-1;
        const getParamById = await dbEnvelopes[reqParams];
        res.status(200).send(getParamById);
    } 
    catch (err) {
        res.status(404).send(err);
    }
};

exports.createNewEnvelope = async (req, res) => {
    try {
        const { title, budjet } = req.body;
        const envelopes = await dbEnvelopes;
        const newEnvelope = {
            id: req.params.id,
            title,
            budjet,
        };
        envelopes.push(newEnvelope);
        res.status(201).send(envelopes);
    }
    catch (err) {
        res.sendStatus(500);
    }

};