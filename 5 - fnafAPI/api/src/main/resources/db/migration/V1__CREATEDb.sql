-- Cria o banco de dados (opcional, se for rodar manualmente)
CREATE DATABASE apiFNAF;

-- Conecta ao banco (ignorado pelo Flyway, útil no psql manualmente)
\c apiFNAF;

-- ===============================================
-- TABELA DE JOGOS (deve vir antes, pois é referenciada)
-- ===============================================
CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    photo_url VARCHAR(255),
    date_of_release DATE,
    creator VARCHAR(50)
);

-- ===============================================
-- TABELA DE TIPOS DE ANIMATRONICS
-- ===============================================
CREATE TABLE animatronic_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255)
);

-- ===============================================
-- TABELA PRINCIPAL DE ANIMATRONICS
-- ===============================================
CREATE TABLE animatronics (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    photo_url VARCHAR(255),
    voice_url VARCHAR(255),
    character_voice VARCHAR(50),
    creator VARCHAR(50),
    type_id INT REFERENCES animatronic_types(id),
    possessed SMALLINT,
    game_id INT REFERENCES games(id)
);

-- ===============================================
-- TABELA DE FOTOS DO ANIMATRONIC
-- ===============================================
CREATE TABLE animatronic_photos (
    id SERIAL PRIMARY KEY,
    animatronic_id INT NOT NULL REFERENCES animatronics(id) ON DELETE CASCADE,
    url TEXT NOT NULL
);

-- ===============================================
-- TABELA DE ÁUDIOS DO ANIMATRONIC
-- ===============================================
CREATE TABLE animatronic_audios (
    id SERIAL PRIMARY KEY,
    animatronic_id INT NOT NULL REFERENCES animatronics(id) ON DELETE CASCADE,
    url TEXT NOT NULL
);