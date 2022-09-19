CREATE TABLE envelopes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    budget INTEGER
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    amount INTEGER, 
    date INTEGER,
    envelope_id INTEGER,
    FOREIGN KEY (envelope_id) REFERENCES envelopes (id)
);