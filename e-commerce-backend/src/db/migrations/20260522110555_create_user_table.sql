-- migrate:up

CREATE TABLE IF NOT EXISTS users(
    userid UUID PRIMARY KEY DEFAULT gen_randon_uuid(),
    username VARCHAR(50) NOT NULL UNIQUE,
    firstname VARCHAR(255) NOT NULL,
    secondname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    age SMALLINT NOT NULL,
    phone VARCHAR(50) NOT NULL UNIQUE,
    gender TEXT NOT NULL,
    password VARCHAR(255) NOT NULL,
    CONSTRAINT gender_check
    CHECK(gender IN('male', 'female', 'other'))
);


-- migrate:down

DROP TABLE IF EXISTS users;

