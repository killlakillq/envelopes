CREATE TABLE envelopes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    budget INTEGER
);

CREATE TABLE transactions (
    title VARCHAR(255),
    amount INTEGER, 
    date INTEGER,
    envelope_id INTEGER PRIMARY KEY,
    FOREIGN KEY (envelope_id) REFERENCES envelopes (id)
);