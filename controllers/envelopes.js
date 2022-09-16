const express = require('express');
const db = require('../helpers/db.js');

exports.getEnvelopes = async (req, res) => {
    try {
        const envelopes = await db.query('SELECT * FROM envelopes');

        if (!envelopes) {
            return res.status(404).json({'Message': 'Not Found'});
        }
        
        return res.status(200).send(envelopes.rows);
    }
    catch (err) {
        res.status(500).send(err);
    }
};


exports.getEnvelopesById = async (req, res) => {
    try {
        const id = req.params.id;
        const envelopes = await db.query('SELECT * FROM envelopes WHERE id = ($1)', [id]);
        
        if (!envelopes) {
            return res.status(404).json({'Message': 'Not Found'});
        }
        return res.status(200).send(envelopes.rows[0]);
    } 
    catch (err) {
        res.status(404).send(err);
    }
};

exports.createNewEnvelope = async (req, res) => {
    try {
        const {id, title, budget} = req.body;
        const envelopes = await db.query(`INSERT INTO envelopes (id, title, budget) VALUES ($1, $2, $3) RETURNING *`, [id, title, budget]);
        res.status(201).send(envelopes.rows[0]);
    }
    catch (err) {
        res.status(500).send(err);
    }
};

exports.updateEnvelope = async (req, res) => {
    try {
        const {id, title, budget} = req.body;
        const envelopes = await db.query(`UPDATE envelopes SET title = $2, budget = $3 WHERE id = $1 RETURNING *`, [id, title, budget]);


        if (!envelopes) {
            return res.status(404).json({'Message': 'Not Found'});
        }
        return res.status(201).json(envelopes.rows[0]);
    }
    catch (err) {
        res.status(500).send(err);
    }
};

exports.deleteEnvelopes = async (req, res) => {
    try {
        const id = req.params.id;
        const envelopes = await db.query('DELETE FROM envelopes WHERE id = $1', [id]);

        if (!envelopes) {
            return res.status(404).json({'Message': 'Not Found'});
        }
        return res.status(204).send(envelopes.rows[0]);
    }
    catch (err) {
        res.status(500).send(err);
    }
};