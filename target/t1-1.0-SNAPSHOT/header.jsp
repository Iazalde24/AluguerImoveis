<%@ page import="javax.servlet.http.HttpSession" %>

<%
    HttpSession session1 = request.getSession();
    String usuarioNome = (String) session1.getAttribute("usuarioNome");
    session1.getAttribute("usuarioEmail");
    boolean isUserLoggedIn = usuarioNome != null;
%>
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
                <a href="index.jsp"></a>
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
