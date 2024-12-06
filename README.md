Para que o projecto java maven web aplication primeiro deve criar um usuario mysql com acessso a todos prevolegios e o banco de dados e depois fazer clone do projecto 

usuario : edilson
senha : 12345678

use aluguerimoveisdb;

CREATE TABLE usuario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE imovel (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL, -- Casa, Apartamento, Escritório
    disponivel BOOLEAN NOT NULL DEFAULT TRUE,
    
    localizacao VARCHAR(255) NOT NULL,
    descricao TEXT,
    usuario_id BIGINT,
    imagem LONGBLOB, -- Coluna para armazenar a imagem

    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

-- Adiciona a coluna de preço na tabela de imóveis
ALTER TABLE imovel ADD preco DECIMAL(10, 2) NOT NULL;


-- Tabela para comentários de imóveis
CREATE TABLE comentario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mensagem TEXT NOT NULL,
    imovel_id BIGINT,
    FOREIGN KEY (imovel_id) REFERENCES imovel(id)
);

-- Tabela para agendamento de visitas
CREATE TABLE visita (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mensagem TEXT NOT NULL,
    data_visita DATE NOT NULL,
    status ENUM('PENDENTE', 'APROVADA', 'REJEITADA') DEFAULT 'PENDENTE',
    imovel_id BIGINT,
    FOREIGN KEY (imovel_id) REFERENCES imovel(id)
);

-- Tabela para contratos de aluguel
CREATE TABLE contrato (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    data_inicio DATE NOT NULL,
    data_fim DATE,
    status ENUM('ATIVO', 'CANCELADO','PENDENTE', 'CONCLUIDO') DEFAULT 'PENDENTE',
    imovel_id BIGINT,
    usuario_id BIGINT,
    FOREIGN KEY (imovel_id) REFERENCES imovel(id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

