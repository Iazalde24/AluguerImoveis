package com.pw.servlet;

import com.pw.entity.Usuario;
import com.pw.entity.Visita;
import java.io.IOException;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.*;

@WebServlet("/visitas")
public class VisitaServlet extends HttpServlet {
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
            List<Visita> visitas = em.createQuery(
                "SELECT v FROM Visita v JOIN v.imovel i WHERE i.usuario.id = :proprietarioId AND v.status = 'PENDENTE'",
                Visita.class
            ).setParameter("proprietarioId", usuario.getId())
             .getResultList();

            request.setAttribute("visitas", visitas);
            request.getRequestDispatcher("ImovelServlet").forward(request, response);
        } finally {
            em.close();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int visitaId = Integer.parseInt(request.getParameter("id"));
        String acao = request.getParameter("acao"); // "APROVAR" ou "REJEITAR"

        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            Visita visita = em.find(Visita.class, visitaId);

            if ("APROVAR".equals(acao)) {
                visita.setStatus("APROVADA");
            } else if ("REJEITAR".equals(acao)) {
                visita.setStatus("REJEITADA");
            }

            em.getTransaction().commit();
        } finally {
            em.close();
        }

        response.sendRedirect("visitas");
    }
}
