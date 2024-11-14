package com.pw.servlet;

import com.pw.entity.Imovel;
import javax.persistence.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.List;

@WebServlet("/ImovelServlet")
public class ImovelServlet extends HttpServlet {
    
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
        EntityManager em = null;

        try {
            em = emf.createEntityManager();
            System.out.println("Conexão com o banco de dados estabelecida.");

            List<Imovel> imoveisDisponiveis = em.createQuery("SELECT i FROM Imovel i WHERE i.disponivel = true", Imovel.class)
                    .getResultList();

            if (imoveisDisponiveis.isEmpty()) {
                System.out.println("Nenhum imóvel disponível encontrado.");
            } else {
                System.out.println("Imóveis disponíveis encontrados: " + imoveisDisponiveis.size());
                for (Imovel imovel : imoveisDisponiveis) {
                    System.out.println("Imóvel: " + imovel.getDescricao() + ", Localização: " + imovel.getLocalizacao() + ", Preço: " + imovel.getPreco());
                }
            }

            // Atribui a lista ao request e encaminha para o JSP
            request.setAttribute("imoveisDisponiveis", imoveisDisponiveis);
            request.getRequestDispatcher("index.jsp").forward(request, response);
        } catch (Exception e) {
            System.err.println("Erro ao acessar o banco de dados: " + e.getMessage());
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
 