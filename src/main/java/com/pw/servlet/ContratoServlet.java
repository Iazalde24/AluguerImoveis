package com.pw.servlet;
import com.pw.entity.Usuario;
import com.pw.entity.*;
import java.io.IOException;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.*;
@WebServlet("/contratos")
public class ContratoServlet extends HttpServlet {
    @PersistenceUnit
    private EntityManagerFactory emf;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        Usuario usuario = (Usuario) session.getAttribute("usuario");

        if (usuario == null) {
            response.sendRedirect("ImovelServlet");
            return;
        }

        EntityManager em = emf.createEntityManager();
        try {
            List<Contrato> contratos = em.createQuery(
                "SELECT c FROM Contrato c JOIN c.imovel i WHERE i.usuario.id = :proprietarioId AND c.status = 'PENDENTE'",
                Contrato.class
            ).setParameter("proprietarioId", usuario.getId())
             .getResultList();

            request.setAttribute("contratos", contratos);
            request.getRequestDispatcher("index.jsp#notificar").forward(request, response);
        } finally {
            em.close();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int contratoId = Integer.parseInt(request.getParameter("id"));
        String acao = request.getParameter("acao"); // "APROVAR" ou "REJEITAR"

        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            Contrato contrato = em.find(Contrato.class, contratoId);

            if ("APROVAR".equals(acao)) {
                contrato.setStatus("ATIVO");

                // Torna o imóvel indisponível
                Imovel imovel = contrato.getImovelId();
                imovel.setDisponivel(false);
            } else if ("REJEITAR".equals(acao)) {
                contrato.setStatus("REJEITADO");
            }

            em.getTransaction().commit();
        } finally {
            em.close();
        }

        response.sendRedirect("contratos");
    }
}
