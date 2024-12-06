package com.pw.servlet;
import com.pw.entity.Usuario;
import com.pw.entity.*;
import java.io.IOException;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceUnit;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.*;
@WebServlet("/AprovarRejeitarContratoServlet")
public class AprovarRejeitarContratoServlet extends HttpServlet {

    private EntityManagerFactory emf = Persistence.createEntityManagerFactory("aluguerPU");

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        EntityManager em = emf.createEntityManager();
        Long contratoId = Long.parseLong(request.getParameter("contratoId"));
        String action = request.getParameter("action");

        try {
            em.getTransaction().begin();
            Contrato contrato = em.find(Contrato.class, contratoId);

            if (contrato != null && contrato.getStatus().equals("PENDENTE")) {
                if ("aprovar".equals(action)) {
                    contrato.setStatus("ATIVO");
                    contrato.getImovelId().setDisponivel(false); // Tornar o imóvel indisponível após a aprovação
                } else if ("rejeitar".equals(action)) {
                    contrato.setStatus("CANCELADO");
                }
                em.merge(contrato);
                em.getTransaction().commit();
            }
            response.sendRedirect("NotificarContratoServlet"); // Atualiza a lista de contratos
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Erro ao processar contrato.");
        } finally {
            em.close();
        }
    }
}
