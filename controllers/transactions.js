const express = require('express');
const db = require('../helpers/db.js');

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await db.query('SELECT * FROM transactions');
        
        if (transactions.rowCount < 1) {
            return res.status(404).json({message: 'No transactions information found'});
        }
        
        res.status(200).send({
			status: 'Success',
			message: 'Transactions information retrieved',
			data: transactions.rows,
		});
    }
    catch (err) {
        res.status(500).send({
            status: 'Failure',
            error: err.message
        });
    }
};


exports.getTransactionsById = async (req, res) => {
    try {
        const id = req.params.id;
        const transactions = await db.query('SELECT * FROM transactions WHERE id = ($1)', [id]);
        
        if (transactions.rowCount < 1) {
            return res.status(404).json({message: 'No transactions information found'});
        }
        return res.status(200).send({
			status: 'Success',
			message: 'Information retrieved',
			data: transactions.rows[0],
			});
    } 
    catch (err) {
        res.status(404).send({
            status: 'Failure',
            error: err.message
        });
    }
};


exports.updateTransactions = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount } = req.body;
        
        const transaction = await db.query('SELECT * FROM transactions WHERE id = $1', [id]);

		if (transaction.rowCount < 1) {
			return res.status(404).send({
				message: "No transaction information found"
			})
		};
        
        const prevAmount = await db.query('SELECT amount FROM transactions WHERE id = $1', [id]);
        await db.query('UPDATE envelopes SET budget = (budget + $1) - $2 WHERE id IN (SELECT envelope_id FROM transactions WHERE id = $3)', [prevAmount.rows[0].amount, amount, id]);

        const updatedTransaction = await db.query('UPDATE transactions SET title = $1, amount = $2 WHERE id = $3 RETURNING *', [title, amount, id]);

        res.status(201).send({
            status: 'Success',
            message: 'Transaction has been updated',
            data: updatedTransaction.rows[0],
        });
    }
    catch (err) {
        res.status(500).send({
            error: err.message
        });
    }
};

exports.deleteTransactions = async (req, res) => {
    try {
        const { id } = req.params;

        const transaction = await db.query('SELECT * FROM transactions WHERE id = $1', [id]);

        if (transaction.rowCount < 1) {
			return res.status(404).send({
				message: "No transaction information found"
			})
		};

        const transactionAmount = await db.query('SELECT amount FROM transactions WHERE id = $1', [id]);
        await db.query('UPDATE envelopes SET budget = budget + $1 WHERE id IN (SELECT envelope_id FROM transactions WHERE id = $2', [transactionAmount.rows[0].amount, id]);
        await db.query('DELETE FROM transactions WHERE id = $1', [id]);

        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).send({
            error: err.message
        });
    }
};