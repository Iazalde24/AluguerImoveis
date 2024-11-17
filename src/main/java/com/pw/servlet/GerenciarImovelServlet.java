package com.pw.servlet;

import com.pw.entity.Imovel;
import com.pw.entity.Usuario;
import java.io.IOException;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/GerenciarImovelServlet")
public class GerenciarImovelServlet extends HttpServlet {

    private EntityManagerFactory emf;

     @Override
    public void init() throws ServletException {
        super.init();
        try {
            emf = Persistence.createEntityManagerFactory("aluguerPU");
        } catch (Exception e) {
            throw new ServletException("Erro ao inicializar o EntityManagerFactory", e);
        }
    }
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        EntityManager em = emf.createEntityManager();
        try {
            Usuario usuarioLogado = (Usuario) request.getSession().getAttribute("usuarioLogado");

            if (usuarioLogado == null) {
                response.sendRedirect("ImovelServlet#gerenciar");
                return;
            }

            // Busca imóveis do usuário logado
            List<Imovel> meusImoveis = em.createQuery("SELECT i FROM Imovel i WHERE i.usuarioId = :usuario", Imovel.class)
                                         .setParameter("usuario", usuarioLogado)
                                         .getResultList();

            request.setAttribute("meusImoveis", meusImoveis);
            request.getRequestDispatcher("index.jsp").forward(request, response);

        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Erro ao carregar os imóveis.");
        } finally {
            em.close();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        EntityManager em = emf.createEntityManager();
        String action = request.getParameter("action");

        try {
            if ("edit".equals(action)) {
                Long id = Long.parseLong(request.getParameter("id"));
                String descricao = request.getParameter("descricao");
                String tipo = request.getParameter("tipo");
                String localizacao = request.getParameter("localizacao");
                double preco = Double.parseDouble(request.getParameter("preco"));

                em.getTransaction().begin();
                Imovel imovel = em.find(Imovel.class, id);
                if (imovel != null) {
                    imovel.setDescricao(descricao);
                    imovel.setTipo(tipo);
                    imovel.setLocalizacao(localizacao);
                    imovel.setPreco(preco);
                }
                em.getTransaction().commit();

            } else if ("delete".equals(action)) {
                Long id = Long.parseLong(request.getParameter("id"));

                em.getTransaction().begin();
                Imovel imovel = em.find(Imovel.class, id);
                if (imovel != null) {
                    em.remove(imovel);
                }
                em.getTransaction().commit();
            }

            response.sendRedirect("GerenciarImovelServlet");

        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Erro ao processar a ação.");
        } finally {
            em.close();
        }
    }

    @Override
    public void destroy() {
        if (emf != null && emf.isOpen()) {
            emf.close();
        }
        super.destroy();
    }
}
