<%@ page import="com.pw.entity.Imovel" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
    // Obtém o imóvel passado pelo servlet como atributo da requisição
    Imovel imovel = (Imovel) request.getAttribute("imovelDetalhes");
    if (imovel == null) {
        out.println("<p>Detalhes do imóvel não disponíveis.</p>");
        return;
    }
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
            <header class="property-header">
                <h1><%= imovel.getDescricao() %></h1>
                <p class="location">
                    <i class="fas fa-map-marker-alt"></i> 
                    <%= imovel.getLocalizacao() %>
                </p>
            </header>

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
                        Ver no Mapa
                    </button>
                    <button class="btn primary" id="schedule-btn">
                        <i class="far fa-calendar-alt"></i> 
                        Agendar Visita
                    </button>
                    <button class="btn contract" id="contract-btn">
                        <i class="fas fa-file-signature"></i> 
                        Fazer Contrato
                    </button>
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
                </section>
            </div>

            <!-- Botão para voltar à lista de imóveis -->
            <button onclick="history.back()" class="btn">Voltar</button>
        </div>
    </main>

    <!-- Footer comum -->
    <jsp:include page="footer.jsp" />

    
</body>
</html>
