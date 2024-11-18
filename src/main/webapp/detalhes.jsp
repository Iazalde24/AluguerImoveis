<%@page import="com.pw.entity.Contrato"%>
<%@ page import="com.pw.entity.Imovel" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
    // Obtém o imóvel passado pelo servlet como atributo da requisição
    Imovel imovel = (Imovel) request.getAttribute("imovelDetalhes");
    if (imovel == null) {
        out.println("<p>Detalhes do imóvel não disponíveis.</p>");
        return;
    }
  
    // Verificar se o imóvel possui um contrato ativo
    Boolean contratoAtivoAttr = (Boolean) request.getAttribute("contratoAtivo");
    boolean isContratoAtivo = contratoAtivoAttr != null && contratoAtivoAttr;



%>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalhes do Imóvel - <%= imovel.getDescricao() %></title>
    <link rel="stylesheet" href="detalhes.css">
      <link rel="stylesheet" href="styles.css">
     
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <header>
    <!-- Header comum -->
    <jsp:include page="header.jsp" />
    </header>
    <!-- Seção de detalhes do imóvel -->
    <main>
        <div class="container">
            <div class="property-header">
                <h1><%= imovel.getDescricao() %></h1>
                <p class="location">
                    <i class="fas fa-map-marker-alt"></i> 
                    <%= imovel.getLocalizacao() %>
                </p>
            </div>

            <section class="gallery">
                <div class="main-image-container">
                    <% 
                        String imagemUrl = (imovel.getImagem() != null) ? "data:image/jpeg;base64," + 
                            java.util.Base64.getEncoder().encodeToString(imovel.getImagem()) 
                            : "/images/placeholder.jpg";
                    %>
                    <img class="main-image" src="<%= imagemUrl %>" alt="Imagem principal do imóvel">
                </div>
            </section>

            <div class="price-actions">
                <div class="price-container">
                    <span class="price-label">Valor Mensal</span>
                    <h2 class="price">MZN <%= imovel.getPreco() %></h2>
                </div>
                <div class="actions">
                    <button class="btn primary" id="map-btn">
                        <i class="fas fa-map-marker-alt"></i> 
                        <a href="https://www.google.com/maps/search/pemba<%= imovel.getLocalizacao() %>">   Ver no Mapa
                        </a>
                    </button>
               <% if (session.getAttribute("usuarioNome")!=null) { %>
                        <button class="btn primary" id="schedule-btn" onclick="openModal('schedule-modal')">
    <i class="far fa-calendar-alt"></i> 
    Agendar Visita
</button>
         <!-- Botão para fazer contrato -->
        <% if (!isContratoAtivo) { %>
<button class="btn contract" id="contract-btn" onclick="openModal('contract-modal')">
    <i class="fas fa-file-signature"></i> 
    Fazer Contrato
</button>
 <% } else { %>
            <button class="btn disabled" title="Contrato já ativo para este imóvel" disabled>
                <i class="fas fa-file-signature"></i> 
                Contrato Ativo
            </button>
        <% } %>
    <% } else { %>
        <!-- Mensagem para usuários não logados -->
        <p class="warning">Faça login para agendar visitas ou realizar contratos.</p>
    <% } %>
                </div>
            </div>

            <div class="content-grid">
                <section class="details">
                    <h3><i class="fas fa-info-circle"></i> Detalhes do Imóvel</h3>
                    <div class="details-grid">
                        <div class="detail-item">
                            <span class="label">Tipo:</span>
                            <span class="value"><%= imovel.getTipo() %></span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Contrato:</span>
                            <span class="value"><%= imovel.getDisponivel() ? "Renda" : "Indisponível" %></span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Estado:</span>
                            <span class="value"><%= imovel.getDisponivel() ? "Disponível" : "Indisponível" %></span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Localização:</span>
                            <span class="value"><%= imovel.getLocalizacao() %></span>
                        </div>
                    </div>
                        
     
      <!-- Modal para Agendar Visita -->
      <div id="schedule-modal" class="modal" style="display: none">
    <div class="modal-content">
        <span class="close" onclick="closeModal('schedule-modal')">&times;</span>
        <h2>Agendar Visita</h2>
        <form action="AgendarVisitaServlet" method="POST">
    <input type="hidden" name="imovelId" value="<%= imovel.getId() %>">
    <label for="mensagem">Mensagem:</label>
    <textarea id="mensagem" name="mensagem" placeholder="Adicione uma mensagem (opcional)"></textarea>

    <label for="dataVisita">Data da Visita:</label>
    <input type="datetime-local" id="dataVisita" name="dataVisita" required>
    
    <button type="submit" class="btn primary">Agendar</button>
</form>

    </div>
</div>

<!-- Modal para Fazer Contrato -->
<div id="contract-modal" class="modal" style="display: none">
    <div class="modal-content">
        <span class="close" onclick="closeModal('contract-modal')">&times;</span>
        <h2>Fazer Contrato</h2>
      <form action="CriarContratoServlet" method="POST">
    <input type="hidden" name="imovelId" value="<%= imovel.getId() %>">
    <label for="dataInicio">Data de Início:</label>
    <input type="date" id="dataInicio" name="dataInicio" required>
    
    <label for="dataFim">Data de Término:</label>
    <input type="date" id="dataFim" name="dataFim" required>
    
    <button type="submit" class="btn primary">Criar Contrato</button>
</form>

    </div>
</div>

                </section>
            </div>

            <!-- Botão para voltar à lista de imóveis -->
            <button onclick="history.back()" class="btn">Voltar</button>
        </div>
    </main>

    
    <script>
    // Abre o modal
    function openModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }

    // Fecha o modal
    function closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    // Fecha o modal se o usuário clicar fora do conteúdo
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    }
</script>

</body>
</html>
