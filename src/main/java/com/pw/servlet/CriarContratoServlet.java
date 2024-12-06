package com.pw.servlet;

import com.pw.entity.Contrato;
import com.pw.entity.Imovel;
import com.pw.entity.Usuario;
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

@WebServlet("/CriarContratoServlet")
public class CriarContratoServlet extends HttpServlet {
    private static final String PERSISTENCE_UNIT_NAME = "aluguerPU";
    private static EntityManagerFactory emf;

    @Override
    public void init() {
        emf = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        Long usuarioId = (Long) session.getAttribute("usuarioId");

        if (usuarioId == null) {
            System.err.println("Erro: Usuário não está logado.");
            response.sendRedirect("erro.jsp?tipo=autenticacao");
            return;
        }

        EntityManager em = emf.createEntityManager();
        try {
            // Recupera o ID do imóvel, a data de início e a data de fim do contrato
            Long imovelId = Long.parseLong(request.getParameter("imovelId"));
            String dataInicio = request.getParameter("dataInicio");
            String dataFim = request.getParameter("dataFim");

            // Recupera o imóvel a partir do ID
            Imovel imovel = em.find(Imovel.class, imovelId);

            if (imovel == null) {
                System.err.println("Erro: Imóvel não encontrado com o ID: " + imovelId);
                response.sendRedirect("erro.jsp?tipo=imovelNaoEncontrado");
                return;
            }

            // Inicia a transação
            em.getTransaction().begin();

            // Cria um novo contrato
            Contrato contrato = new Contrato();
            contrato.setImovelId(imovel);
            contrato.setUsuarioId(em.find(Usuario.class, usuarioId)); // Atribuindo o usuário logado ao contrato
            contrato.setDataInicio(java.sql.Date.valueOf(dataInicio));
            contrato.setDataFim(java.sql.Date.valueOf(dataFim));
            contrato.setStatus("PENDENTE");

            // Persiste o contrato
            em.persist(contrato);

            // Commit da transação
            em.getTransaction().commit();

            // Redireciona para a página de imóveis
            response.sendRedirect("ImovelServlet");
        } catch (Exception e) {
            e.printStackTrace();
            em.getTransaction().rollback();
            response.sendRedirect("erro.jsp?tipo=contrato");
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
