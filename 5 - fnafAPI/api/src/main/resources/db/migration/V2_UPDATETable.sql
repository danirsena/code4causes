-- Adiciona colunas 'name' e 'description' nas tabelas 'audio' e 'photos'

-- ===== Tabela AUDIO =====
ALTER TABLE audio
ADD COLUMN name VARCHAR(255),
ADD COLUMN description TEXT;

-- ===== Tabela PHOTOS =====
ALTER TABLE photos
ADD COLUMN name VARCHAR(255),
ADD COLUMN description TEXT;
