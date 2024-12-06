Para que o projecto java maven web aplication primeiro deve criar um usuario mysql com acessso a todos prevolegios e o banco de dados e depois fazer clone do projecto, e para funcionar correctamente deve estar conectado a internet.

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

Passos para Executar o Sistema
Acesso Inicial ao Sistema:

Ao rodar o projeto, você é redirecionado ao menu principal na página index.jsp.
Inicialmente, sem estar logado, você pode visualizar os imóveis disponíveis e utilizar a barra de pesquisa no cabeçalho para filtrar imóveis pela descrição.
Visualização dos Detalhes do Imóvel:

Ao clicar em um imóvel listado na seção Home, você será levado à página de detalhes.jsp, onde pode ver informações mais detalhadas do imóvel, como descrição, localização, preço e imagem.
Nesta página, como você ainda não está logado, os botões Fazer Contrato e Agendar Visita estarão desativados.
Cadastro e Login:

No cabeçalho (header.jsp), há opções de Login e Cadastro:
Caso ainda não tenha uma conta, você pode se registrar preenchendo suas informações no formulário de cadastro.
Se já tiver uma conta, basta realizar o login com seu email e senha.
Funcionalidades Disponíveis Após o Login:

Após fazer login, você terá acesso a novas funcionalidades:
Fazer Contrato e Agendar Visita: Na página de detalhes, os botões para criar contratos e agendar visitas estarão habilitados.
Seções Adicionais:
Gerenciamento: Aparece no menu do cabeçalho e permite que o proprietário gerencie seus imóveis. Aqui, ele pode adicionar, editar e excluir imóveis de forma prática.
Notificar: Disponível para proprietários, esta seção lista os contratos pendentes associados aos seus imóveis. O proprietário pode aprovar ou rejeitar contratos diretamente nesta seção.
