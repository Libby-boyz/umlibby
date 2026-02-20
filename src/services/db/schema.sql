CREATE DATABASE libby;

CREATE TABLE libby.library(
    id         INTEGER      NOT NULL AUTO_INCREMENT,
    name       VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE libby.capacity_datapoint(
    library_id  INTEGER  NOT NULL,
    time        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    direction   BOOLEAN  NOT NULL,

    PRIMARY KEY (library_id, time),
    FOREIGN KEY (library_id) REFERENCES library(id)
);

INSERT INTO libby.library (name) VALUES ('dafoe'), ('stpauls');