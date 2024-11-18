<%@page import="java.util.ArrayList"%>
<%@ page import="com.pw.entity.Imovel" %>
<%@ page import="java.util.List" %>
<%@ page import="javax.servlet.http.HttpSession" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
    // Recupera a lista de imóveis do atributo da requisição
    List<Imovel> meusImoveis = (List<Imovel>) request.getAttribute("meusImoveis");
    if (meusImoveis == null) {
        meusImoveis = new ArrayList<>(); // Previne erro de nulidade
    }
%>


<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Imóveis Moz - Início</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="proprietario.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">

</head>
<body>
    <header><%@ include file="header.jsp" %></header>
<!-- Cabeçalho e Navegação -->


<!-- Seção Principal -->
<main>
  
    <section id="home" class="section active">
        <div class="search-section">
            <h3>Buscar Imóveis</h3>
            <div class="search-filter">
                <div class="search-container">
                    <i data-feather="search"></i>
                    <input type="text" id="searchInput" placeholder="Pesquisar imóveis...">
                </div>
                <select id="propertyType">
                    <option value="">Tipo de Imóvel</option>
                    <option value="casa">Casa</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="terreno">Terreno</option>
                </select>
                <select id="location">
                    <option value="">Localização</option>
                    <option value="centro">Centro</option>
                    <option value="wimbe">Wimbe</option>
                    <option value="chuiba">Chuiba</option>
                </select>
                <button id="searchBtn" class="btn btn-primary">Buscar</button>
            </div>
        </div>
<div id="imoveis-container" style="display: flex; flex-wrap: wrap;">
    <%
        List<Imovel> imoveis = (List<Imovel>) request.getAttribute("imoveisDisponiveis");

        if (imoveis == null) {
            System.out.println("Atributo 'imoveisDisponiveis' não encontrado no request.");
    %>
            <p>Atributo 'imoveisDisponiveis' não encontrado no request.</p>
    <%
        } else if (imoveis.isEmpty()) {
            System.out.println("Atributo 'imoveisDisponiveis' está vazio.");
    %>
            <p>Nenhum imovel disponivel.</p>
    <%
        } else {
            System.out.println("Imóveis disponíveis recebidos no JSP: " + imoveis.size());
            for (Imovel imovel : imoveis) {
    %>
            <div class="imovel-block" onclick="window.location.href='DetalhesImovelServlet?id=<%= imovel.getId() %>'">
                <div class="imovel-image" 
                     style="background-image: url('<%= request.getContextPath() %>/image?id=<%= imovel.getId() %>'); 
                            background-size: cover; 
                            background-position: center;">
                </div>
                <div class="imovel-info">
                    <h3><%= imovel.getDescricao() %></h3>
                    <p>Localização: <%= imovel.getLocalizacao() %></p>
                    <p>Preço: R$ <%= imovel.getPreco() %></p>
                    <p class="<%= imovel.getDisponivel() ? "disponivel" : "indisponivel" %>">
                        <%= imovel.getDisponivel() ? "Disponível" : "Indisponível" %>
                    </p>
                </div>
            </div>
    <%
            }
        }
    %>
</div>

    </section>

     
    <section id="imoveis" class="section">
        <div id="destaques" class="content-section">
            <h2>Todos Imóveis</h2>
            <div id="imoveis-destaques-container" style="display: flex; flex-wrap: wrap;">
                <%
                    if (imoveis != null) {
                        for (Imovel imovel : imoveis) {
                %>
                   <div class="imovel-block" onclick="window.location.href='DetalhesImovelServlet?id=<%= imovel.getId() %>'">
                <div class="imovel-image" 
                     style="background-image: url('<%= request.getContextPath() %>/image?id=<%= imovel.getId() %>'); 
                            background-size: cover; 
                            background-position: center;">
                </div>   <div class="imovel-info">
    <h3><%= imovel.getDescricao() %></h3>
    <p>Localização: <%= imovel.getLocalizacao() %></p>
    <p>Preço: R$ <%= imovel.getPreco() %></p>
    <p class="<%= imovel.getDisponivel() ? "disponivel" : "indisponivel" %>">
        <%= imovel.getDisponivel() ? "Disponível" : "Indisponível" %>
    </p>
</div>

    
                    </div>
                <%
                        }
                    } else {
                %>
                    <p>Nenhum imóvel disponível no momento.</p>
                <%
                    }
                %>
            </div>
        </div>
    </section>
<section id="gerenciar" class="section hidden-section">
    <div class="proprietario-main">
        <aside class="sidebar">
            <ul>
                <li><a href="#" class="active" data-section="dashboard">Dashboard</a></li>
                <li><a href="#" data-section="meus-imoveis">Meus Imóveis</a></li>
                <li><a href="#" data-section="adicionar-imovel">Adicionar Imóvel</a></li>
            </ul>
        </aside>

        <div class="content">
            <!-- Dashboard -->
            <section id="dashboard" class="active-section">
                <h2>Bem-vindo, <%= usuarioNome %>!</h2>
                <div class="dashboard-cards">
                    <div class="card">
                        <h3>Total de Imóveis</h3>
                        <p class="card-value"><%= meusImoveis != null ? meusImoveis.size() : 0 %></p>
                    </div>
                </div>
            </section>
<!-- Meus Imóveis -->
<section id="meus-imoveis" class="hidden-section">
    <h2>Meus Imóveis</h2>
    <table id="imoveis-table">
        <thead>
            <tr>
                <th>Título</th>
                <th>Tipo</th>
                <th>Localização</th>
                <th>Preço</th>
                <th>Status</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            <%
                if (meusImoveis != null) {
                    for (Imovel imovel : meusImoveis) {
            %>
                <tr>
                    <td><%= imovel.getDescricao() %></td>
                    <td><%= imovel.getTipo() %></td>
                    <td><%= imovel.getLocalizacao() %></td>
                    <td>MZN <%= imovel.getPreco() %></td>
                    <td><%= imovel.getDisponivel() ? "Disponível" : "Indisponível" %></td>
                    <td>
                        <!-- Botão Editar -->
                        <button class="btn-icon edit-btn" 
                            onclick="openEditModal(<%= imovel.getId() %>, 
                            '<%= imovel.getDescricao() %>', 
                            '<%= imovel.getTipo() %>', 
                            '<%= imovel.getLocalizacao() %>', 
                            <%= imovel.getPreco() %>)">
                            <i class="fa fa-edit"></i>
                        </button>
                        <!-- Botão Excluir -->
                        <button class="btn-icon delete-btn" 
                            onclick="openDeleteModal(<%= imovel.getId() %>)">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            <%
                    }
                } else {
            %>
                <tr><td colspan="6">Nenhum imóvel cadastrado.</td></tr>
            <%
                }
            %>
        </tbody>
    </table>

    <!-- Modal de Editar -->
    <div id="editModal" class="modal hidden">
        <div class="modal-content">
            <h3>Editar Imóvel</h3>
            <form method="post" action="GerenciarImovelServlet">
                <input type="hidden" name="action" value="edit">
                <input type="hidden" name="id" id="edit-id">
                <div class="form-group">
                    <label for="edit-descricao">Descrição</label>
                    <input type="text" id="edit-descricao" name="descricao" required>
                </div>
                <div class="form-group">
                    <label for="edit-tipo">Tipo</label>
                    <select id="edit-tipo" name="tipo" required>
                        <option value="casa">Casa</option>
                        <option value="apartamento">Apartamento</option>
                        <option value="terreno">Terreno</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-localizacao">Localização</label>
                    <input type="text" id="edit-localizacao" name="localizacao" required>
                </div>
                <div class="form-group">
                    <label for="edit-preco">Preço (MZN)</label>
                    <input type="number" id="edit-preco" name="preco" required>
                </div>
                <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                <button type="button" class="btn btn-secondary" onclick="closeEditModal()">Cancelar</button>
            </form>
        </div>
    </div>

    <!-- Modal de Excluir -->
    <div id="deleteModal" class="modal hidden">
        <div class="modal-content">
            <h3>Tem certeza que deseja excluir este imóvel?</h3>
            <form method="post" action="GerenciarImovelServlet">
                <input type="hidden" name="action" value="delete">
                <input type="hidden" name="id" id="delete-id">
                <button type="submit" class="btn btn-danger">Excluir</button>
                <button type="button" class="btn btn-secondary" onclick="closeDeleteModal()">Cancelar</button>
            </form>
        </div>
    </div>
</section>

            <!-- Adicionar Novo Imóvel -->
            <section id="adicionar-imovel" class="hidden-section">
                <h2>Adicionar Novo Imóvel</h2>
                <form id="add-imovel-form" method="post" action="ImovelServlet" enctype="multipart/form-data">
                    <div class="form-group">
                        <label for="descricao">Título</label>
                        <input type="text" id="descricao" name="descricao" required>
                    </div>
                    <div class="form-group">
                        <label for="tipo">Tipo</label>
                        <select id="tipo" name="tipo" required>
                            <option value="casa">Casa</option>
                            <option value="apartamento">Apartamento</option>
                            <option value="terreno">Terreno</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="localizacao">Localização</label>
                        <input type="text" id="localizacao" name="localizacao" required>
                    </div>
                    <div class="form-group">
                        <label for="preco">Preço (MZN)</label>
                        <input type="number" id="preco" name="preco" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="imagem">Foto do Imóvel</label>
                        <input type="file" id="imagem" name="imagem" accept="image/*" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Adicionar Imóvel</button>
                </form>
            </section>
        </div>
    </div>
</section>

    <script src="https://unpkg.com/feather-icons"></script>
</main>

<!-- Formulário de Login -->
<div id="login-overlay" class="overlay">
    <div class="form-container">
        <span class="close-btn" onclick="closeForm('login')">&times;</span>
        <h2>Login</h2>
        <form action="UsuarioServlet" method="post">
            <input type="hidden" name="action" value="login">
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="senha" placeholder="Senha" required>
            <button type="submit" class="button-login">Entrar</button>
        </form>
        <p class="form-footer">Não tem uma conta? <a href="#" onclick="showForm('register')">Cadastre-se</a></p>
    </div>
</div>

<!-- Formulário de Cadastro -->
<div id="register-overlay" class="overlay">
    <div class="form-container">
        <span class="close-btn" onclick="closeForm('register')">&times;</span>
        <h2>Cadastro</h2>
        <form action="UsuarioServlet" method="post">
            <input type="hidden" name="action" value="cadastrar">
            <input type="text" name="nome" placeholder="Nome" required>
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="senha" placeholder="Senha" required>
            <input type="password" name="confirm-senha" placeholder="Confirmar Senha" required>
            <button type="submit" class="button-register">Cadastrar</button>
        </form>
    </div>
</div>

<!-- JavaScript -->
<script>// Função para abrir o modal de edição
function openEditModal(id, descricao, tipo, localizacao, preco) {
    document.getElementById("edit-id").value = id;
    document.getElementById("edit-descricao").value = descricao;
    document.getElementById("edit-tipo").value = tipo;
    document.getElementById("edit-localizacao").value = localizacao;
    document.getElementById("edit-preco").value = preco;

    const editModal = document.getElementById("editModal");
    editModal.classList.remove("hidden");
}

// Função para fechar o modal de edição
function closeEditModal() {
    const editModal = document.getElementById("editModal");
    editModal.classList.add("hidden");
}

// Função para abrir o modal de exclusão
function openDeleteModal(id) {
    document.getElementById("delete-id").value = id;

    const deleteModal = document.getElementById("deleteModal");
    deleteModal.classList.remove("hidden");
}

// Função para fechar o modal de exclusão
function closeDeleteModal() {
    const deleteModal = document.getElementById("deleteModal");
    deleteModal.classList.add("hidden");
}

    document.addEventListener("DOMContentLoaded", function () {
    // Seleciona os links do menu lateral
    const sidebarLinks = document.querySelectorAll(".sidebar ul li a");
    // Seleciona as seções internas do gerenciar
    const sections = document.querySelectorAll("#gerenciar .content section");

    // Adiciona evento de clique em cada link
    sidebarLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Previne comportamento padrão do link

            // Remove a classe 'active' de todos os links
            sidebarLinks.forEach(item => item.classList.remove("active"));

            // Adiciona a classe 'active' ao link clicado
            this.classList.add("active");

            // Oculta todas as seções
            sections.forEach(section => {
                section.classList.remove("active-section");
                section.classList.add("hidden-section");
            });

            // Mostra a seção correspondente ao link clicado
            const targetSectionId = this.getAttribute("data-section");
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                targetSection.classList.remove("hidden-section");
                targetSection.classList.add("active-section");
            }
        });
    });
});

    // Seleciona todos os blocos de imóveis
// Seleciona todos os blocos de imóveis
document.querySelectorAll('.imovel-block').forEach(item => {
    item.addEventListener('click', () => {
        const idImovel = item.getAttribute('data-id');
        
        // Realiza uma requisição para buscar os detalhes do imóvel
        fetch(`/ImovelServlet?id=` + idImovel)
            .then(response => response.text())
            .then(html => {
                // Atualiza a seção com o conteúdo dos detalhes do imóvel
                document.querySelector('#main-content').innerHTML = html;
            })
            .catch(error => console.error('Erro ao carregar os detalhes do imóvel:', error));
    });
});

    // Função para exibir a seção correspondente ao link clicado
function showSection(sectionId) {
    // Ocultar todas as seções
    const sections = document.querySelectorAll('main .section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Exibir a seção correspondente ao ID
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }

    // Atualizar o estado dos links do menu
    const menuLinks = document.querySelectorAll('nav ul li a');
    menuLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Adicionar a classe 'active' ao link clicado
    const activeLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Event listeners para os links do menu
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Evita o comportamento padrão do link
        const sectionId = this.getAttribute('href').substring(1); // Obtém o ID da seção
        showSection(sectionId); // Exibe a seção correspondente
    });
});

    // Função para abrir os formulários de login/cadastro
    function showForm(formType) {
        document.getElementById(formType + '-overlay').style.display = 'block';
    }

    // Função para fechar os formulários de login/cadastro
    function closeForm(formType) {
        document.getElementById(formType + '-overlay').style.display = 'none';
    }

    // Função para exibir o menu do usuário autenticado
    function showUserMenu(userName) {
        document.getElementById('auth-buttons').style.display = 'none';
        document.getElementById('user-menu').style.display = 'block';
        document.getElementById('user-avatar').title = userName;
    }

   

    // Função para alternar entre seções
    function showContent(sectionId) {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none'; 
        });
        document.getElementById(sectionId).classList.add('active');
        document.getElementById(sectionId).style.display = 'block'; 
    }

    // Inicializar o estado da sessão ao carregar a página
    window.onload = function() {
        if ("<%= isUserLoggedIn %>" === "true") {
            showUserMenu("<%= usuarioNome %>");
        }
    };
</script>
 <script src="script.js"></script>
</body>
</html>
