const express = require('express');
const dbEnvelopes = require('../helpers/db.js');

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
        const id = req.params.id-1;
        const getParamById = await dbEnvelopes[id];
        
        if (!getParamById) {
            return res.status(404).json({'Message': 'Not Found'});
        }
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
        res.status(500).send(err);
    }

};

exports.updateEnvelope = async (req, res) => {
    try {
        const id = req.params.id-1;
        const envelopes = await dbEnvelopes;

        envelopes[id]['title'] = req.body.title;
        envelopes[id]['budget'] = req.body.budget;

        if (!envelopes) {
            return res.status(404).json({'Message': 'Not Found'});
        }
        res.status(201).json(envelopes);
    }
    catch (err) {
        res.status(500).send(err);
    }

};

exports.deleteEnvelopes = async (req, res) => {
    try {
        const id = req.params.id-1;
        const envelopes = await dbEnvelopes;

        const findEnvelopes = envelopes.filter((en) => en.id === id);
        const removeEnvelopes = envelopes.splice(findEnvelopes, 1);

        if (!envelopes) {
            return res.status(404).json({'Message': 'Not Found'});
        }
        res.status(204).send(removeEnvelopes);
    }
    catch (err) {
        res.status(500).send(err);
    }
};

exports.transfer = async (req, res) => {
    try {
 
    }
    catch (err) {
        res.status(500).send(err);
    }
};