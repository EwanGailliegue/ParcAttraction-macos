PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS critique;
DROP TABLE IF EXISTS attraction;
DROP TABLE IF EXISTS users;

CREATE TABLE attraction (
    attraction_id INTEGER PRIMARY KEY ASC,
    nom TEXT NOT NULL,
    description TEXT NOT NULL,
    difficulte INTEGER,
    visible BOOLEAN DEFAULT true
);

CREATE TABLE users (
    users_id INTEGER PRIMARY KEY ASC,
    name TEXT NOT NULL,
    password TEXT NOT NULL
);

-- Critiques (pas de lien vers users)
-- CREATE TABLE critique (
 --   critique_id INTEGER PRIMARY KEY ASC,
--    attraction_id INTEGER NOT NULL,
--    auteur TEXT,                 -- ex: "Lucas Martin" (peut être NULL si anonyme)
--    note INTEGER NOT NULL,
--    commentaire TEXT NOT NULL,
--    visible BOOLEAN DEFAULT true,
--    created_at TEXT DEFAULT (datetime('now')),
--    FOREIGN KEY (attraction_id) REFERENCES attraction(attraction_id) ON DELETE CASCADE
--);
