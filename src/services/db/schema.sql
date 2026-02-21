CREATE DATABASE libby;

CREATE TABLE libby.library(
    id          INTEGER      NOT NULL AUTO_INCREMENT,
    name        VARCHAR(100) NOT NULL,
    latitude    DOUBLE       NOT NULL,
    longitude   DOUBLE       NOT NULL,
    building    VARCHAR(100) NOT NULL,
    floor_count INTEGER NOT NULL DEFAULT 1,
    capacity    INTEGER      NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE libby.capacity_datapoint(
    id          INTEGER  NOT NULL AUTO_INCREMENT,
    library_id  INTEGER  NOT NULL,
    time        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    direction   BOOLEAN  NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (library_id) REFERENCES library(id) ON DELETE CASCADE
);

INSERT INTO libby.library (name, latitude, longitude, capacity, floor_count, loundess) VALUES
    ("Albert D. Cohen Management Library",  49.80806, -97.13000, 0, 4),
    ("Architecture/Fine Arts Library",      49.80450, -97.13700, 0, 1),
    ("Donald W. Craik Engineering Library", 49.80590, -97.14000, 0, 1),
    ("E. K. Williams Law Library",          49.80550, -97.14150, 0, 1),
    ("Eckhardt-Gramatté Music Library",     49.80580, -97.14200, 0, 1),
    ("Elizabeth Dafoe Library",             49.80588, -97.14097, 0, 3),
    ("Fr. Harold Drake Library",            49.80560, -97.14150, 0, 2),
    ("Sciences and Technology Library",     49.80600, -97.14050, 0, 1),
    ("St. John's College Library",          49.80480, -97.13850, 0, 1),