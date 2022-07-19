CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id bigserial NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    comments TEXT,
    status VARCHAR DEFAULT 'active',
    phone VARCHAR,
    PRIMARY KEY (user_id)
);

INSERT INTO users (
	first_name,
	last_name,
	email,
	comments,
	status,
	phone
) VALUES (
	'kevin',
	'ndahayo',
	'ndahayokevin1@gmail.com',
	'I really like this guy',
	'active',
	0789056898
);

INSERT INTO users (
	first_name,
	last_name,
	email,
	comments,
	status,
	phone
) VALUES (
	'Dodo',
	'ndahayo',
	'ndahayoDodo@gmail.com',
	'I really like this guy',
	'active',
	0789056898
);

UPDATE users SET first_name = 'Evans', last_name = 'Michael', email = 'michaelevans@gmail.com', comments = 'He is a known guy', phone = '+25098388353' WHERE user_id = 4