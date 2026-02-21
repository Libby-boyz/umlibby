CREATE DATABASE libby;

CREATE TABLE libby.library(
    id          INTEGER      NOT NULL AUTO_INCREMENT,
    name        VARCHAR(100) NOT NULL,
    building    VARCHAR(100) NOT NULL,
    latitude    DOUBLE       NOT NULL,
    longitude   DOUBLE       NOT NULL,
    floor_count INTEGER      NOT NULL DEFAULT 1,
    capacity    INTEGER      NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE libby.capacity_datapoint(
    id          INTEGER  NOT NULL AUTO_INCREMENT,
    library_id  INTEGER  NOT NULL,
    time        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    offset      INTEGER  NOT NULL, #1 or -1

    PRIMARY KEY (id),
    FOREIGN KEY (library_id) REFERENCES library(id) ON DELETE CASCADE
);


INSERT INTO libby.library (name, building, latitude, longitude, capacity, floor_count) VALUES
    ("Elizabeth Dafoe Library",                        "Elizabeth Dafoe Library",    49.80588, -97.14097, 1,007, 3),
    ("Father Harold Drake Library",                    "St. Paul's College",         49.80806, -97.13000, 150 , 2),
    ("E. K. Williams Law Library",                     "Robson Hall",                49.80550, -97.14150, 113, 1),
    ("Architecture/Fine Arts Library",                 "John A. Russell Building",   49.80450, -97.13700, 63, 1),
    ("Jim Peebles Sciences and Technology Library",    "Machray Hall",               49.80600, -97.14050, 486, 3),
    ("Albert D. Cohen Management Library",             "Drake Centre",               49.80806, -97.13000, 0, 4),
    ("Donald W. Craik Engineering Library",            "EITC-E3",                    49.80590, -97.14000, 0, 1),
    ("Eckhardt-Gramatte Music Library",                "Tache Arts Complex",         49.80580, -97.14200, 0, 1),
    ("St. John's College Library",                     "St. John's College",         49.80480, -97.13850, 0, 1);