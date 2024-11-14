<%@ page import="com.pw.entity.Imovel" %>
<%@ page import="java.util.List" %>
<%@ page import="javax.servlet.http.HttpSession" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
    HttpSession session1 = request.getSession();
    String usuarioNome = (String) session1.getAttribute("usuarioNome");
    boolean isUserLoggedIn = usuarioNome != null;
%>

<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Imóveis Moz - Início</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

<!-- Cabeçalho e Navegação -->
<header>
    <div class="logo">
        <h1>Imóveis Moz</h1>
    </div>

    <nav>
        <ul>
            <li><a href="#home" class="active">Início</a></li>
            <li><a href="#imoveis">Todos Imóveis</a></li>
            <li><a href="#sobre">Sobre Nós</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <% if (isUserLoggedIn) { %>
                <li id="manageImoveisItem" style="display:block;"><a href="#gerenciar">Gerenciar Imóveis</a></li>
            <% } else { %>
                <li id="manageImoveisItem" style="display:none;"><a href="#gerenciar">Gerenciar Imóveis</a></li>
            <% } %>
        </ul>
    </nav>

    <!-- Botões de autenticação -->
    <div class="auth-buttons" id="auth-buttons" style="<%= isUserLoggedIn ? "display:none;" : "display:block;" %>">
        <a href="#" class="button-login" onclick="showForm('login')">Login</a>
        <a href="#" class="button-cadastro" onclick="showForm('register')">Cadastro</a>
    </div>

 <!-- Menu do usuário autenticado -->
<div class="user-menu" id="user-menu" style="<%= isUserLoggedIn ? "display:block;" : "display:none;" %>">
    <div class="avatar" id="user-avatar">
        <img src="avatar.png" alt="Avatar" id="avatar-img">
        <span id="dropdown-arrow" class="arrow-down"></span>
        <div class="dropdown" id="user-dropdown">
            <ul id="dropdown-menu">
                <!-- Nome do usuário (não clicável) -->
                <li><span><img src="avatar.png" alt="Usuário Icone"> <%= usuarioNome %></span></li>
                
                <!-- Opção de administrador, se for um admin -->
                <% if ("Admin".equals(usuarioNome)) { %>
                    <li><a href="admin.html"><img src="admin-icon.png" alt="Admin Icone"> Administrador do sistema</a></li>
                <% } %>
                
                <!-- Botão de logout -->
                <li>
                    <form action="UsuarioServlet" method="post" style="display: inline;">
                        <input type="hidden" name="action" value="logout">
                        <button type="submit" class="logout-link"><img src="logout-icon.png" alt="Logout Icone"> Logout</button>
                    </form>
                </li>
            </ul>
        </div>
    </div>
</div>

</header>

<!-- Seção Principal -->
<main>
    <!-- Seção de Busca -->
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

    <!-- Container dos Imóveis -->
    <div id="imoveis-container" style="display: flex; flex-wrap: wrap;">
        <%
            // Obtém a lista de imóveis do atributo da request
            List<Imovel> imoveis = (List<Imovel>) request.getAttribute("imoveisDisponiveis");
            
            if (imoveis == null) {
                // Log para depuração
                System.out.println("Atributo 'imoveisDisponiveis' não encontrado no request.");
        %>
                <p>Atributo 'imoveisDisponiveis' não encontrado no request.</p>
        <%
            } else if (imoveis.isEmpty()) {
                // Log para depuração
                System.out.println("Atributo 'imoveisDisponiveis' está vazio.");
        %>
                <p>Atributo 'imoveisDisponiveis' está vazio.</p>
        <%
            } else {
                // Exibe os imóveis disponíveis
                System.out.println("Imóveis disponíveis recebidos no JSP: " + imoveis.size());
                for (Imovel imovel : imoveis) {
        %>
                <div class="imovel-block">
                    <div class="imovel-image" style="background-image: url('<%= imovel.getImagem() %>');"></div>
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

    <!-- Seção de Destaques -->
    <section id="imoveis" class="section">
        <div id="destaques" class="content-section">
            <h2>Todos Imóveis</h2>
            <div id="imoveis-destaques-container" style="display: flex; flex-wrap: wrap;">
                <%
                    if (imoveis != null) {
                        for (Imovel imovel : imoveis) {
                %>
                    <div class="imovel-block">
                        <div class="imovel-image" style="background-image: url('<%= imovel.getImagem() %>');"></div>
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
                    } else {
                %>
                    <p>Nenhum imóvel disponível no momento.</p>
                <%
                    }
                %>
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
<script>
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
