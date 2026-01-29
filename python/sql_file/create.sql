INSERT INTO attraction (nom, description, difficulte, visible) VALUES
('Silver Star', 'Montagne russe (Europa-Park, Allemagne)', 5, 1),
('Blue Fire', 'Montagne russe à lancement (Europa-Park, Allemagne)', 4, 1),
('Wodan Timburcoaster', 'Montagne russe en bois (Europa-Park, Allemagne)', 4, 1),
('Toutatis', 'Montagne russe (Parc Astérix, France)', 5, 1),
('OzIris', 'Montagne russe inversée (Parc Astérix, France)', 4, 1),
('Shambhala', 'Montagne russe (PortAventura, Espagne)', 5, 1),
('Dragon Khan', 'Montagne russe à loopings (PortAventura, Espagne)', 4, 1),
('Grande Roue', 'Attraction panoramique familiale', 1, 1),
('Pirates', 'Balade en bateau familiale', 1, 1),
('Maison Hantée', 'Parcours immersif', 2, 0);


INSERT INTO users (name, password) VALUES ('toto', 'toto');

INSERT INTO critique (attraction_id, auteur, note, commentaire, visible) VALUES
(1, 'Lucas Martin', 5, 'Incroyable, sensations fortes garanties !', 1),
(1, NULL, 4, 'Super, mais un peu d’attente.', 1),
(2, 'Emma Dupont', 4, 'Lancement impressionnant, très fluide.', 1),
(4, 'Thomas Durand', 5, 'La meilleure attraction du parc.', 1),
(8, 'Julie Petit', 5, 'Parfait pour une pause et une belle vue.', 1),
(10, 'Anonyme', 3, 'Sympa mais pas très effrayant.', 0);
