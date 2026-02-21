CREATE DATABASE libby;

CREATE TABLE libby.library(
    id          INTEGER      NOT NULL AUTO_INCREMENT,
    name        VARCHAR(100) NOT NULL,
    building    VARCHAR(100) NOT NULL,
    latitude    DOUBLE       NOT NULL,
    longitude   DOUBLE       NOT NULL,
    floor_count INTEGER      NOT NULL DEFAULT 1,
    capacity    INTEGER      NOT NULL,
    image       VARCHAR(500) NOT NULL,
    place_id    VARCHAR(200) NOT NULL,
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


INSERT INTO libby.library (name, building, latitude, longitude, capacity, floor_count, image, place_id) VALUES
    ("Elizabeth Dafoe Library",                        "Elizabeth Dafoe Library",    49.80588, -97.14097, 1007, 3, "https://umanitoba.ca/libraries/sites/libraries/files/styles/3x2_900w/public/2020-11/dafoe-library.JPG?itok=77qX113_", "ChIJyT3wMeN16lIR4uCNN2ihi2c"),
    ("Father Harold Drake Library",                    "St. Paul's College",         49.80806, -97.13000, 150 , 2, "https://umanitoba.ca/libraries/sites/libraries/files/styles/3x2_900w/public/2020-12/father-h-drake-library_2.jpg?itok=Y_svr4zg", "ChIJ29m287F16lIRbp_uJl2vhGU"),
    ("E. K. Williams Law Library",                     "Robson Hall",                49.80550, -97.14150, 113,  1, "https://www.umanitoba.ca/libraries/sites/libraries/files/styles/3x2_900w/public/2020-12/ek-williams-law-library-exterior.jpg?itok=6b-G8tAl", "ChIJQ03Rg8N16lIRCSg0XpMVN48"),
    ("Architecture/Fine Arts Library",                 "John A. Russell Building",   49.80450, -97.13700, 63,   1, " ", "ChIJw1aL5_p16lIR3VZwVaUxt4c"),
    ("Jim Peebles Sciences and Technology Library",    "Machray Hall",               49.80600, -97.14050, 486,  3, "static/5.png", "ChIJU0VlYeN16lIR7G_0aqtCyIc"),
    ("Albert D. Cohen Management Library",             "Drake Centre",               49.80806, -97.13000, 0,    4, "static/6.png", ""),
    ("Donald W. Craik Engineering Library",            "EITC-E3",                    49.80590, -97.14000, 0,    1, "static/7.png", ""),
    ("Eckhardt-Gramatte Music Library",                "Tache Arts Complex",         49.80580, -97.14200, 0,    1, "https://umanitoba.ca/libraries/sites/libraries/files/styles/3x2_900w/public/2024-12/music-library-interior-study-area.jpg?itok=U8kfJFra", "ChIJ47NlLRZ16lIRmX5v8E3uUMs")
