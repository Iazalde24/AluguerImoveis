package com.pw.servlet;


import com.pw.entity.Contrato;
import com.pw.entity.Imovel;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/DetalhesImovelServlet")
public class DetalhesImovelServlet extends HttpServlet {

    private EntityManagerFactory emf;

    @Override
    public void init() throws ServletException {
        try {
            emf = Persistence.createEntityManagerFactory("aluguerPU");
            System.out.println("EntityManagerFactory criado com sucesso.");
        } catch (Exception e) {
            System.err.println("Erro ao criar EntityManagerFactory: " + e.getMessage());
            throw new ServletException("Erro ao inicializar o servlet: " + e);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String idParam = request.getParameter("id");
        if (idParam == null || idParam.isEmpty()) {
            response.sendRedirect("index.jsp");  // Redireciona caso o id não seja fornecido
            return;
        }

        EntityManager em = null;
        try {
            em = emf.createEntityManager();
            Long imovelId = Long.parseLong(idParam);

            // Busca o imóvel com o ID fornecido
            Imovel imovel = em.find(Imovel.class, imovelId);

            if (imovel == null) {
                response.sendRedirect("index.jsp"); // Redireciona se o imóvel não for encontrado
            } else {
                // Atribui o imóvel como atributo da requisição e encaminha para o JSP de detalhes
                request.setAttribute("imovelDetalhes", imovel);
                request.getRequestDispatcher("detalhes.jsp").forward(request, response);
            }
             // Buscar contrato associado ao imóvel
            // Buscar contrato associado ao imóvel
                boolean contratoAtivo = em.createQuery("SELECT COUNT(c) FROM Contrato c WHERE c.imovel_id = :imovelId AND c.status = 'ATIVO'", Long.class)
                                      .setParameter("imovelId", imovel)
                                      .getSingleResult() > 0;

            // Passar dados para o JSP
            request.setAttribute("imovelDetalhes", imovel);
             request.setAttribute("contratoAtivo", contratoAtivo); // Define como true ou false


                request.getRequestDispatcher("detalhes.jsp").forward(request, response);

        } catch (NumberFormatException e) {
            System.err.println("ID inválido: " + e.getMessage());
            response.sendRedirect("index.jsp");
        } finally {
            if (em != null) {
                em.close();
                System.out.println("Conexão com o banco de dados fechada.");
            }
        }
    }

    @Override
    public void destroy() {
        if (emf != null) {
            emf.close();
        }
    }
}
