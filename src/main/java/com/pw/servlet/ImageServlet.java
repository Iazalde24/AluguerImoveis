package com.pw.servlet;

import com.pw.entity.Imovel;
import java.io.IOException;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/image")
public class ImageServlet extends HttpServlet {

    private EntityManagerFactory emf;

    @Override
    public void init() throws ServletException {
        emf = Persistence.createEntityManagerFactory("aluguerPU");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String id = request.getParameter("id");

        if (id == null || id.isEmpty()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "ID da imagem não fornecido.");
            return;
        }

        EntityManager em = emf.createEntityManager();
        try {
            Imovel imovel = em.find(Imovel.class, Long.parseLong(id));
            if (imovel == null || imovel.getImagem() == null) {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Imagem não encontrada.");
                return;
            }

            // Definir o tipo de conteúdo da resposta
            response.setContentType("image/jpeg"); // Ou "image/png", dependendo do tipo
            response.getOutputStream().write(imovel.getImagem());
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Erro ao carregar a imagem.");
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
