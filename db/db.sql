CREATE DATABASE IF NOT EXISTS blogdb;

USE blogdb;

DELIMITER //

CREATE FUNCTION BIN_TO_UUID(bin BINARY(16))
RETURNS CHAR(36) DETERMINISTIC
BEGIN
  DECLARE hex CHAR(32);
  SET hex = HEX(bin);
  RETURN LOWER(CONCAT(LEFT(hex, 8), '-', MID(hex, 9, 4), '-', MID(hex, 13, 4), '-', MID(hex, 17, 4), '-', RIGHT(hex, 12)));
END; //

DELIMITER ;

DELIMITER //

CREATE FUNCTION UUID_TO_BIN(uuid CHAR(36))
RETURNS BINARY(16) DETERMINISTIC
BEGIN
  RETURN UNHEX(CONCAT(REPLACE(uuid, '-', '')));
END; //

DELIMITER ;

CREATE TABLE IF NOT EXISTS roles (
    id INT NOT NULL,
    rol VARCHAR ( 20 ) NOT NULL UNIQUE,
    PRIMARY KEY ( id )
);

CREATE TABLE IF NOT EXISTS users (
    id BINARY(16) NOT NULL,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(70) NOT NULL,
    deleted BOOLEAN DEFAULT FALSE,
    id_rol INT DEFAULT 2 NOT NULL,
    PRIMARY KEY ( id ),
    CONSTRAINT fk_role FOREIGN KEY ( id_rol ) REFERENCES roles( id )
);

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT NOT NULL,
    tag VARCHAR(30) NOT NULL UNIQUE,
    PRIMARY KEY ( id ) 
);

CREATE TABLE IF NOT EXISTS anime_entries (
    id INT AUTO_INCREMENT NOT NULL UNIQUE,
    title VARCHAR(80) NOT NULL UNIQUE,
    cover_url VARCHAR(100) NOT NULL,
    rating SMALLINT NOT NULL,
    synopsis TEXT NOT NULL,
    review TEXT NOT NULL,
    deleted BOOLEAN DEFAULT FALSE,
    created_at DATETIME NOT NULL,
    author BINARY(16) NOT NULL,
    PRIMARY KEY ( id ),
    CONSTRAINT fk_author FOREIGN KEY( author ) REFERENCES users( id )
);

CREATE TABLE IF NOT EXISTS entry_categories (
    entry_id INT,
    tag_id INT,
    PRIMARY KEY ( entry_id, tag_id ),
    CONSTRAINT fk_anime_entry FOREIGN KEY( entry_id ) REFERENCES anime_entries( id ),
    CONSTRAINT fk_categories FOREIGN KEY( tag_id ) REFERENCES categories( id )
);

CREATE TABLE IF NOT EXISTS entry_likes (
    entry_id INT,
    user_id BINARY(16),
    CONSTRAINT fk_entry_id FOREIGN KEY (entry_id) REFERENCES anime_entries( id ), 
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users( id ), 
);

CREATE TABLE IF NOT EXISTS entry_comments (
    entry_id INT,
    user_id BINARY(16),
    commentary VARCHAR(255),
    PRIMARY KEY ( entry_id, user_id )
    CONSTRAINT fk_entry_id FOREIGN KEY (entry_id) REFERENCES anime_entries( id ), 
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users( id ), 
);

INSERT INTO roles ( 
    rol
) VALUES 
( 'ADMIN_ROLE' ),
( 'USER_ROLE' );

INSERT INTO categories (
    tag
) VALUES
('Acción'),
('Aventura'),
('Ciencia Ficción'),
('Comedia'),
('Demonios'),
('Deportes'),
('Drama'),
('Ecchi'),
('Escolares'),
('Espacial'),
('Fantasía'),
('Infantil'),
('Magia'),
('Mecha'),
('Militar'),
('Misterio'),
('Psicológico'),
('Recuentos de la vida'),
('Romance'),
('Seinen'),
('Shoujo'),
('Shounen'),
('Sobrenatural'),
('Suspenso'),
('Terror'),
('Vampiros'),
('Yaoi'),
('Yuri');