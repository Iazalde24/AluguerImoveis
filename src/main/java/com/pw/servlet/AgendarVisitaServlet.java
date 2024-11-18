package com.pw.servlet;

import com.pw.entity.Imovel;
import com.pw.entity.Usuario;
import com.pw.entity.Visita;
import java.io.IOException;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/AgendarVisitaServlet")
public class AgendarVisitaServlet extends HttpServlet {
    private static final String PERSISTENCE_UNIT_NAME = "aluguerPU";
    private static EntityManagerFactory emf;

    @Override
    public void init() {
        emf = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
    }

  @Override
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    HttpSession session = request.getSession();
    String usuarioNome = (String) session.getAttribute("usuarioNome");

    if (usuarioNome == null) {
        System.err.println("Erro: Usuário não está logado.");
        response.sendRedirect("erro.jsp?tipo=autenticacao");
        return;
    }

    EntityManager em = emf.createEntityManager();
    try {
        String email = (String) session.getAttribute("usuarioEmail");
        String mensagem = request.getParameter("mensagem");
        String dataVisita = request.getParameter("dataVisita");
        Long imovelId = Long.parseLong(request.getParameter("imovelId"));

        Imovel imovel = em.find(Imovel.class, imovelId);

        if (imovel == null) {
            System.err.println("Erro: Imóvel não encontrado com o ID: " + imovelId);
            response.sendRedirect("erro.jsp?tipo=imovelNaoEncontrado");
            return;
        }

        em.getTransaction().begin();

        Visita visita = new Visita();
        visita.setNome(usuarioNome);
        visita.setEmail(email);
        visita.setMensagem(mensagem);
        visita.setDataVisita(java.sql.Timestamp.valueOf(dataVisita.replace("T", " ") + ":00"));
        visita.setImovelId(imovel);

        em.persist(visita);
        em.getTransaction().commit();

        response.sendRedirect("ImovelServlet");
    } catch (Exception e) {
        e.printStackTrace();
        em.getTransaction().rollback();
        response.sendRedirect("erro.jsp?tipo=visita");
    } finally {
        em.close();
    }
}
  @Override
    public void destroy() {
        if (emf != null) {
            emf.close();
        }
    }
}
