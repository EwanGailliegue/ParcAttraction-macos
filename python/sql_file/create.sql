INSERT INTO attraction (nom, description, difficulte, visible) VALUES
-- Europa-Park (Allemagne)
('Silver Star', 'Montagne russe hypercoaster de 73m (Europa-Park, Allemagne)', 5, 1),
('Blue Fire', 'Montagne russe à lancement magnétique (Europa-Park, Allemagne)', 4, 1),
('Wodan Timburcoaster', 'Montagne russe en bois de 40m (Europa-Park, Allemagne)', 4, 1),
('Arthur', 'Parcours scénique interactif 4D (Europa-Park, Allemagne)', 2, 1),

-- Parc Astérix (France)
('Toutatis', 'Montagne russe extrême avec 3 lanceurs (Parc Astérix, France)', 5, 1),
('OzIris', 'Montagne russe inversée (Parc Astérix, France)', 4, 1),
('Tonnerre de Zeus', 'Grande montagne russe en bois (Parc Astérix, France)', 4, 1),
('Le Vol d''Icare', 'Tour de chute libre panoramique (Parc Astérix, France)', 3, 1),

-- PortAventura (Espagne)
('Shambhala', 'Hypercoaster de 76m, plus haute d''Europe (PortAventura, Espagne)', 5, 1),
('Dragon Khan', 'Montagne russe à 8 inversions (PortAventura, Espagne)', 4, 1),
('Red Force', 'Accélération 0-180 km/h en 5 secondes (Ferrari Land, Espagne)', 5, 1),
('Furius Baco', 'Lancement à 135 km/h (PortAventura, Espagne)', 4, 1),

-- Disneyland Paris (France)
('Big Thunder Mountain', 'Montagne russe dans une mine (Disneyland Paris, France)', 3, 1),
('Space Mountain', 'Voyage spatial à grande vitesse (Disneyland Paris, France)', 4, 1),
('Tower of Terror', 'Chute libre dans un hôtel hanté (Walt Disney Studios, France)', 4, 1),
('Crush''s Coaster', 'Montagne russe spinning aquatique (Walt Disney Studios, France)', 3, 1),

-- Efteling (Pays-Bas)
('Baron 1898', 'Plongée verticale de 37m (Efteling, Pays-Bas)', 4, 1),
('Joris en de Draak', 'Double montagne russe en bois (Efteling, Pays-Bas)', 3, 1),
('Symbolica', 'Parcours scénique fantasmagorique (Efteling, Pays-Bas)', 1, 1),

-- Alton Towers (Royaume-Uni)
('The Smiler', 'Record du monde avec 14 inversions (Alton Towers, UK)', 5, 1),
('Nemesis', 'Montagne russe inversée légendaire (Alton Towers, UK)', 4, 1),
('Wicker Man', 'Montagne russe en bois avec effets de feu (Alton Towers, UK)', 4, 1),

-- Phantasialand (Allemagne)
('Taron', 'Double lancement magnétique (Phantasialand, Allemagne)', 4, 1),
('Black Mamba', 'Montagne russe inversée suspendue (Phantasialand, Allemagne)', 4, 1),
('F.L.Y.', 'Première montagne russe volante avec launch (Phantasialand, Allemagne)', 4, 1),

-- Attractions familiales variées
('Grande Roue', 'Attraction panoramique familiale classique', 1, 1),
('Carrousel', 'Manège traditionnel pour toute la famille', 1, 1),
('Train Fantôme', 'Parcours immersif dans le noir', 2, 1),
('Bateau Pirate', 'Balancier géant thématique', 2, 1),
('Tasses Tournantes', 'Attraction rotative familiale', 1, 1),
('Rivière Sauvage', 'Descente aquatique avec éclaboussures', 2, 1);     

INSERT INTO users (name, password) VALUES ('toto', 'toto');

-- Données de test critiques
INSERT INTO critique (attraction_id, prenom, nom, note, commentaire, visible) VALUES
(1, 'Lucas', 'Martin', 5, 'Incroyable, sensations fortes garanties !', 1),
(1, NULL, NULL, 4, 'Super, mais un peu d''attente.', 1),
(2, 'Emma', 'Dupont', 4, 'Lancement impressionnant, très fluide.', 1),
(4, 'Thomas', 'Durand', 5, 'La meilleure attraction du parc.', 1),
(8, 'Julie', 'Petit', 5, 'Parfait pour une pause et une belle vue.', 1),
(10, NULL, NULL, 3, 'Sympa mais pas très effrayant.', 0),
(1, 'Sophie', 'Bernard', 5, 'Adrénaline pure, jadore !', 1),
(2, 'Alexandre', 'Roux', 5, 'Le meilleur coaster que jai fait !', 1),
(3, 'Marie', 'Leroy', 4, 'Très fun, idéal en famille.', 1),
(4, 'Pierre', 'Moreau', 4, 'Impressionnant mais un peu court.', 1),
(5, 'Camille', 'Simon', 3, 'Bien pour les enfants.', 1),
(6, NULL, NULL, 5, 'Magnifique spectacle, à ne pas rater !', 1),
(7, 'Hugo', 'Laurent', 4, 'Bon restaurant, prix corrects.', 1),
(8, 'Léa', 'Lefebvre', 4, 'Vue splendide sur le parc.', 1),
(9, 'Nathan', 'Michel', 2, 'Trop dattente pour ce que cest.', 1),
(10, 'Chloé', 'Garcia', 4, 'Bien réalisé, ambiance réussie.', 1),
(1, 'Julien', 'Martinez', 5, 'Mon attraction préférée !', 1),
(2, NULL, NULL, 5, 'Vitesse incroyable, sensations au top.', 1),
(3, 'Manon', 'Rodriguez', 5, 'Les enfants ont adoré !', 1),
(4, 'Antoine', 'Fernandez', 3, 'Pas mal mais jattendais mieux.', 0),
(5, 'Laura', 'Lopez', 4, 'Mignon et bien fait.', 1),
(6, 'Maxime', 'Gonzalez', 5, 'Spectacle époustouflant !', 1),
(7, 'Clara', 'Sanchez', 3, 'Nourriture correcte, service lent.', 1),
(8, NULL, NULL, 5, 'Moment de détente parfait.', 1),
(9, 'Théo', 'Perez', 3, 'Moyen, sans plus.', 1),
(10, 'Inès', 'Martin', 5, 'Très effrayant, jadore !', 1),
(1, 'Louis', 'Dubois', 4, 'Génial mais file dattente trop longue.', 1),
(2, 'Zoé', 'Thomas', 5, 'Loopings parfaits, rien à redire.', 1),
(3, NULL, NULL, 4, 'Amusant pour toute la famille.', 1),
(4, 'Arthur', 'Robert', 5, 'Hauteur impressionnante !', 1),
(5, 'Lily', 'Richard', 5, 'Adorable, les petits sont ravis.', 1),
(6, 'Gabriel', 'Petit', 4, 'Beau spectacle mais un peu long.', 1),
(7, 'Anaïs', 'Durand', 4, 'Bon rapport qualité-prix.', 1),
(8, 'Tom', 'Leroy', 5, 'Vue panoramique exceptionnelle.', 1),
(9, NULL, NULL, 1, 'Décevant, pas du tout effrayant.', 0),
(10, 'Eva', 'Moreau', 4, 'Bonne ambiance, décors réussis.', 1),
(1, 'Noah', 'Simon', 5, 'Le must du parc !', 1),
(2, 'Lina', 'Laurent', 4, 'Super expérience, je recommande.', 1),
(3, 'Adam', 'Bernard', 5, 'Parfait pour les 6-10 ans.', 1),
(4, NULL, NULL, 4, 'Montée vertigineuse !', 1),
(5, 'Sarah', 'Roux', 3, 'Sympa mais répétitif.', 1),
(6, 'Baptiste', 'Girard', 5, 'Effets spéciaux incroyables.', 1),
(7, 'Océane', 'Bonnet', 2, 'Prix élevés, qualité moyenne.', 0),
(8, 'Mathis', 'Mercier', 4, 'Reposant et agréable.', 1),
(9, 'Alice', 'Garnier', 4, 'Quelques bons frissons.', 1),
(10, 'Raphaël', 'Faure', 5, 'Terrifiant, exactement ce que je voulais !', 1),
(1, 'Jade', 'Blanc', 5, 'Encore et encore !', 1),
(2, 'Ethan', 'Guerin', 5, 'Accélérations folles !', 1),
(3, 'Rose', 'Muller', 4, 'Très réussi.', 1);
