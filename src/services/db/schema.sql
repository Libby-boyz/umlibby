CREATE DATABASE libby;
USE libby;

CREATE TABLE library(
    id          INTEGER      NOT NULL AUTO_INCREMENT,
    name        VARCHAR(100) NOT NULL,
    building    VARCHAR(100) NOT NULL,
    latitude    DOUBLE       NOT NULL,
    longitude   DOUBLE       NOT NULL,
    floor_count INTEGER      NOT NULL DEFAULT 1,
    capacity    INTEGER      NOT NULL,
    image       VARCHAR(500) NOT NULL,
    place_id    VARCHAR(200) NOT NULL,
    summary     VARCHAR(1000) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE capacity_datapoint(
    id          INTEGER  NOT NULL AUTO_INCREMENT,
    library_id  INTEGER  NOT NULL,
    time        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    offset      INTEGER  NOT NULL, #1 or -1

    PRIMARY KEY (id),
    FOREIGN KEY (library_id) REFERENCES library(id) ON DELETE CASCADE
);

INSERT INTO library (id, name, building, latitude, longitude, capacity, floor_count, image, place_id, summary) VALUES
    ("1", "Elizabeth Dafoe Library",                        "Elizabeth Dafoe Library",    49.80588, -97.14097, 1007, 3, "https://umanitoba.ca/libraries/sites/libraries/files/styles/3x2_900w/public/2020-11/dafoe-library.JPG?itok=77qX113_", "ChIJyT3wMeN16lIR4uCNN2ihi2c","The Elizabeth Dafoe Library is University of Manitoba's largest library, supporting research and teaching primarily in the Faculties of Arts, Education, Kinesiology and Recreation Management, Social Work, and Graduate Studies, as well as University 1."),
    ("2", "Father Harold Drake Library",                    "St. Paul's College",         49.80806, -97.13000, 150 , 2, "https://umanitoba.ca/libraries/sites/libraries/files/styles/3x2_900w/public/2020-12/father-h-drake-library_2.jpg?itok=Y_svr4zg", "ChIJ29m287F16lIRbp_uJl2vhGU","The Father Harold Drake Library at St. Paul's College focuses on supporting the teaching and research needs of staff and students at St. Paul's College including the Jesuit Centre for Catholic Studies and Arthur V. Mauro Institute for Peace and Justice."),
    ("3", "E. K. Williams Law Library",                     "Robson Hall",                49.80550, -97.14150, 113,  1, "https://www.umanitoba.ca/libraries/sites/libraries/files/styles/3x2_900w/public/2020-12/ek-williams-law-library-exterior.jpg?itok=6b-G8tAl", "ChIJQ03Rg8N16lIRCSg0XpMVN48", "E.K. Williams Law Library primarily serves the teaching and research needs of the Faculty of Law and the University and is an integral part of the legal resources of Manitoba, delivering legal information to members of the legal profession, the judiciary, other professional groups."),
    ("4", "Architecture/Fine Arts Library",                 "John A. Russell Building",   49.80450, -97.13700, 63,   1, "static/4.png", "ChIJw1aL5_p16lIR3VZwVaUxt4c", "The Architecture/Fine Arts Library houses the largest collection of information on art, design and planning in the province of Manitoba. It supports the teaching and research requirements of the Faculty of Architecture which includes programs in architecture, city planning, interior design and landscape architecture. The library also supports the School of Art with programs in fine arts and art history."),
    ("5", "Jim Peebles Sciences and Technology Library",    "Machray Hall",               49.80600, -97.14050, 486,  3, "static/5.png", "ChIJU0VlYeN16lIR7G_0aqtCyIc","The Jim Peebles Science and Technology Library closed for renovations May 1, 2024. Anticipated reopening is 2026. Learn where to find the collection, study spaces and librarian help. The Jim Peebles Science and Technology Library serves the research, study, and teaching requirements of the Faculties of Science, Engineering, Agricultural and Food Sciences, and Environment, Earth, and Resources."),
    ("6", "Albert D. Cohen Management Library",             "Drake Centre",               49.80806, -97.13000, 1230,    4, "static/6.png", "", "The Albert D. Cohen Management Library, situated in the Drake Centre of the Asper School of Business, supports the teaching, learning, and research needs of management and business students and faculty at the University of Manitoba. Designed as a modern learning commons, it offers access to business information resources alongside collaborative and individual study spaces, group rooms, and technology-enabled facilities that foster active learning. The library is named after Albert D. Cohen in recognition of his leadership and philanthropic contributions to business education."),
    ("7", "Donald W. Craik Engineering Library",            "EITC-E3",                    49.80590, -97.14000, 872,    1, "static/7.png", "", "The Donald W. Craik Engineering Library serves as the primary academic information hub for students, faculty, and researchers in the Faculty of Engineering at the University of Manitoba. Located within the Engineering Building, the library supports engineering education and research with targeted collections including reference works, standards, technical resources, and access to specialized electronic information. The space provides study areas and librarian support to help users find and use engineering-focused resources effectively. The library is named in honour of Donald W. Craik, an alumnus and distinguished engineer and public servant associated with the University."),
    ("8", "Eckhardt-Gramatte Music Library",                "Tache Arts Complex",         49.80580, -97.14200, 93,    1, "https://umanitoba.ca/libraries/sites/libraries/files/styles/3x2_900w/public/2024-12/music-library-interior-study-area.jpg?itok=U8kfJFra", "ChIJ47NlLRZ16lIRmX5v8E3uUMs","The Sophie-Carmen Eckhardt-Gramatté Music Library supports study, research, and performance at the University of Manitoba. As a unit of the University of Manitoba Libraries, the Music Library provides a vast range of print, recorded and electronic resources to students, faculty and staff of the University as well as members of the public.");

CREATE VIEW current_capacity AS
SELECT dp.library_id, SUM(dp.offset) AS fullness FROM capacity_datapoint as dp
WHERE DATE(dp.time) = CURDATE()
GROUP BY dp.library_id;

-- FAKE DATA GENERATED BY ChatGPT
INSERT INTO capacity_datapoint (library_id, time, offset) VALUES
    -- Library 1
    (1, '2026-02-22 06:30:00', 1),
    (1, '2026-02-22 07:15:00', 1),
    (1, '2026-02-22 07:45:00', 1),
    (1, '2026-02-22 08:10:00', 1),
    (1, '2026-02-22 08:30:00', 1),
    (1, '2026-02-22 08:50:00', 1),
    (1, '2026-02-22 09:05:00', 1),
    (1, '2026-02-22 09:25:00', 1),
    (1, '2026-02-22 09:40:00', -1),
    (1, '2026-02-22 10:05:00', 1),
    (1, '2026-02-22 10:15:00', 1),
    (1, '2026-02-22 10:30:00', 1),
    (1, '2026-02-22 10:45:00', -1),
    (1, '2026-02-22 11:10:00', 1),
    (1, '2026-02-22 11:20:00', 1),
    (1, '2026-02-22 11:35:00', -1),
    (1, '2026-02-22 11:50:00', 1),
    (1, '2026-02-22 12:05:00', 1),
    (1, '2026-02-22 12:15:00', -1),
    (1, '2026-02-22 12:30:00', 1),
    (1, '2026-02-22 12:45:00', -1),
    (1, '2026-02-22 12:55:00', 1),
    (1, '2026-02-22 13:10:00', 1),
    (1, '2026-02-22 13:25:00', 1),
    (1, '2026-02-22 13:40:00', -1),
    (1, '2026-02-22 13:50:00', 1),
    (1, '2026-02-22 14:05:00', -1),
    (1, '2026-02-22 14:20:00', 1),
    (1, '2026-02-22 14:35:00', -1),
    (1, '2026-02-22 14:50:00', 1),
    (1, '2026-02-22 15:10:00', 1),
    (1, '2026-02-22 15:30:00', -1),
    (1, '2026-02-22 15:45:00', -1),
    (1, '2026-02-22 16:05:00', 1),
    (1, '2026-02-22 16:20:00', -1),
    (1, '2026-02-22 16:40:00', -1),
    (1, '2026-02-22 16:55:00', 1),
    (1, '2026-02-22 17:15:00', -1),
    (1, '2026-02-22 17:30:00', -1),
    (1, '2026-02-22 17:45:00', 1),
    (1, '2026-02-22 18:05:00', -1),
    (1, '2026-02-22 18:25:00', -1),
    (1, '2026-02-22 18:50:00', -1),
    (1, '2026-02-22 19:10:00', 1),
    (1, '2026-02-22 19:40:00', -1),
    (1, '2026-02-22 20:15:00', -1),
    (1, '2026-02-22 20:45:00', -1),
    (1, '2026-02-22 21:20:00', -1),
    (1, '2026-02-22 21:50:00', -1),
    (1, '2026-02-22 22:10:00', -1),
    (1, '2026-02-22 22:30:00', -1),
    (1, '2026-02-22 23:05:00', -1),
    (1, '2026-02-22 23:45:00', -1),

    -- Library 2 (steady morning, heavy afternoon)
    (2, '2026-02-22 07:00:00', 1),
    (2, '2026-02-22 07:30:00', 1),
    (2, '2026-02-22 08:00:00', 1),
    (2, '2026-02-22 09:00:00', 1),
    (2, '2026-02-22 10:00:00', 1),
    (2, '2026-02-22 11:00:00', 1),
    (2, '2026-02-22 12:00:00', 2),
    (2, '2026-02-22 13:00:00', 2),
    (2, '2026-02-22 14:00:00', 2),
    (2, '2026-02-22 15:00:00', -1),
    (2, '2026-02-22 16:00:00', -1),
    (2, '2026-02-22 17:00:00', -1),
    (2, '2026-02-22 18:00:00', -2),
    (2, '2026-02-22 19:00:00', -2),
    (2, '2026-02-22 20:00:00', -1),

    -- Library 2 (separate day)
    (2, '2026-02-23 08:00:00', 1),
    (2, '2026-02-23 08:30:00', 1),
    (2, '2026-02-23 09:00:00', 1),
    (2, '2026-02-23 10:00:00', 1),
    (2, '2026-02-23 11:00:00', 1),
    (2, '2026-02-23 12:00:00', 1),
    (2, '2026-02-23 13:00:00', 2),
    (2, '2026-02-23 14:00:00', 2),
    (2, '2026-02-23 15:00:00', 2),
    (2, '2026-02-23 16:00:00', -1),
    (2, '2026-02-23 17:00:00', -1),
    (2, '2026-02-23 18:00:00', -1),
    (2, '2026-02-23 19:00:00', -2),
    (2, '2026-02-23 20:00:00', -2),
    (2, '2026-02-23 21:00:00', -1),

    -- Library 3 (quiet morning, busy evening)
    (3, '2026-02-22 09:30:00', 1),
    (3, '2026-02-22 10:30:00', 1),
    (3, '2026-02-22 12:00:00', 1),
    (3, '2026-02-22 14:00:00', 1),
    (3, '2026-02-22 16:00:00', 2),
    (3, '2026-02-22 17:00:00', 2),
    (3, '2026-02-22 18:00:00', 2),
    (3, '2026-02-22 19:00:00', 1),
    (3, '2026-02-22 20:00:00', -1),
    (3, '2026-02-22 21:00:00', -2),
    (3, '2026-02-22 22:00:00', -2),

    -- Library 4 (short peak at lunch)
    (4, '2026-02-22 08:00:00', 1),
    (4, '2026-02-22 09:00:00', 1),
    (4, '2026-02-22 10:00:00', 1),
    (4, '2026-02-22 11:30:00', 2),
    (4, '2026-02-22 12:00:00', 2),
    (4, '2026-02-22 12:30:00', 2),
    (4, '2026-02-22 13:00:00', -1),
    (4, '2026-02-22 14:00:00', -1),
    (4, '2026-02-22 15:00:00', -1),
    (4, '2026-02-22 16:00:00', -1),

    -- Library 5 (very busy all day)
    (5, '2026-02-22 07:00:00', 2),
    (5, '2026-02-22 08:00:00', 2),
    (5, '2026-02-22 09:00:00', 3),
    (5, '2026-02-22 10:00:00', 3),
    (5, '2026-02-22 11:00:00', 3),
    (5, '2026-02-22 12:00:00', 3),
    (5, '2026-02-22 13:00:00', 3),
    (5, '2026-02-22 14:00:00', 2),
    (5, '2026-02-22 15:00:00', 2),
    (5, '2026-02-22 16:00:00', -2),
    (5, '2026-02-22 17:00:00', -2),
    (5, '2026-02-22 18:00:00', -3),
    (5, '2026-02-22 19:00:00', -3),

    -- Library 6 (light usage, gradual trickle)
    (6, '2026-02-22 09:00:00', 1),
    (6, '2026-02-22 11:00:00', 1),
    (6, '2026-02-22 13:00:00', 1),
    (6, '2026-02-22 15:00:00', 1),
    (6, '2026-02-22 17:00:00', -1),
    (6, '2026-02-22 19:00:00', -1),
    (6, '2026-02-22 21:00:00', -2),

    -- Library 7 (morning rush only)
    (7, '2026-02-22 06:30:00', 2),
    (7, '2026-02-22 07:00:00', 2),
    (7, '2026-02-22 07:30:00', 2),
    (7, '2026-02-22 08:00:00', 1),
    (7, '2026-02-22 09:00:00', -2),
    (7, '2026-02-22 10:00:00', -2),
    (7, '2026-02-22 11:00:00', -1),

    -- Library 8 (late afternoon study crowd)
    (8, '2026-02-22 12:00:00', 1),
    (8, '2026-02-22 13:00:00', 1),
    (8, '2026-02-22 14:00:00', 2),
    (8, '2026-02-22 15:00:00', 2),
    (8, '2026-02-22 16:00:00', 2),
    (8, '2026-02-22 17:00:00', 1),
    (8, '2026-02-22 18:00:00', -1),
    (8, '2026-02-22 19:00:00', -2),
    (8, '2026-02-22 20:00:00', -2);