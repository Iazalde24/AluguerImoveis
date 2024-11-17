package com.pw.servlet;

import com.pw.entity.Imovel;
import com.pw.entity.Usuario;
import javax.persistence.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.List;

@WebServlet("/ImovelServlet")
@MultipartConfig
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
        EntityManager em = emf.createEntityManager();
        HttpSession session = request.getSession();
        Long usuarioId = (Long) session.getAttribute("usuarioId");

        try {
            // Carregar imóveis disponíveis publicamente
            List<Imovel> imoveisDisponiveis = em.createQuery("SELECT i FROM Imovel i WHERE i.disponivel = true", Imovel.class)
                    .getResultList();
            request.setAttribute("imoveisDisponiveis", imoveisDisponiveis);

            // Carregar imóveis do usuário logado
            if (usuarioId != null) {
                List<Imovel> meusImoveis = em.createQuery("SELECT i FROM Imovel i WHERE i.usuarioId.id = :usuarioId", Imovel.class)
                        .setParameter("usuarioId", usuarioId)
                        .getResultList();
                request.setAttribute("meusImoveis", meusImoveis);
            }

            request.getRequestDispatcher("index.jsp").forward(request, response);
        } finally {
            em.close();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        String action = request.getParameter("action");
        Long usuarioId = (Long) session.getAttribute("usuarioId");
        if (usuarioId == null) {
            response.sendRedirect("index.jsp?erro=login"); // Redireciona caso o usuário não esteja logado
            return;
        }

        EntityManager em = emf.createEntityManager();

        try {
            String titulo = request.getParameter("titulo");
            String tipo = request.getParameter("tipo");
            String localizacao = request.getParameter("localizacao");
            double preco = Double.parseDouble(request.getParameter("preco"));
            String descricao = request.getParameter("descricao");

            // Manipular o upload de imagem
            Part imagemPart = request.getPart("imagem");
            byte[] imagemBytes = null;
            if (imagemPart != null && imagemPart.getSize() > 0) {
                imagemBytes = imagemPart.getInputStream().readAllBytes();
            }

            Usuario usuario = em.find(Usuario.class, usuarioId);
            Imovel novoImovel = new Imovel();
            novoImovel.setDescricao(titulo);
            novoImovel.setTipo(tipo);
            novoImovel.setLocalizacao(localizacao);
            novoImovel.setPreco(preco);
            novoImovel.setDescricao(descricao);
            novoImovel.setImagem(imagemBytes);
            novoImovel.setDisponivel(true);
            novoImovel.setUsuarioId(usuario);

            em.getTransaction().begin();
            em.persist(novoImovel);
            em.getTransaction().commit();

            response.sendRedirect("ImovelServlet");
            
        } catch (Exception e) {
            System.err.println("Erro ao salvar imóvel: " + e.getMessage());
            response.sendRedirect("index.jsp?erro=gerenciamento");
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
