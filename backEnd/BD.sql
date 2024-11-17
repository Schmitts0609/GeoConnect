create database GeoConnect;
use GeoConnect;

CREATE TABLE cupons (
	id int primary key auto_increment,
    estabelecimento_id int,
    descricao varchar(255),
    valor_desconto decimal(10, 2),
    pontos_necessarios int
);

CREATE TABLE estabelecimentos (
    id int primary key auto_increment,
    nome varchar(255) not null,
    email varchar(255) not null,
    cnpj varchar(255) not null,
    codigo_validador_atual int,
    CHECK (codigo_validador_atual BETWEEN 1000000 AND 9999999),
    ultimo_codigo_validador int,
    CHECK (ultimo_codigo_validador BETWEEN 1000000 AND 9999999),
    hora_modificacao timestamp
);

CREATE TABLE historico_login (
    id int auto_increment primary key,
    UserId int,
    data_login varchar(255)
);

CREATE TABLE postagens (
    id int primary key auto_increment,
    UserId int,
    NomeImagem varchar(255),
    ImagemPerfil varchar(255),
    Tipo_postagem varchar(255),
    Hora_postagem timestamp,
    Legenda varchar(255)
);

CREATE TABLE resgate_cupom (
    id int primary key auto_increment,
    UserId int,
    CupomId int,
    Data_resgate timestamp,
    Data_utilizado varchar(255)
);

CREATE TABLE usuarios (
    id int primary key auto_increment,
    Nome varchar(255) not null,
    Nickname varchar(18) not null,
    Email varchar(254) not null,
    Senha varchar(255) not null,
    Data_criacao timestamp,
    ImagemPerfil varchar(255),
    Pontos int  -- adicionado depois
);

CREATE TABLE notificacoes (
    id int auto_increment primary key,
    id_usuario int,
    id_alheio int
);

CREATE TABLE user_follows (
    follower_id INT NOT NULL,
    following_id INT NOT NULL,
    follow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

