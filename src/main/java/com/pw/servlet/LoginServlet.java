package com.pw.servlet;

import com.pw.entity.Usuario;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import javax.persistence.NoResultException;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    private EntityManagerFactory emf;

    @Override
    public void init() {
        emf = Persistence.createEntityManagerFactory("aluguerPU");
    }

  @Override
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    String email = request.getParameter("email");
    String senha = request.getParameter("senha");

    EntityManager em = emf.createEntityManager();
    try {
        TypedQuery<Usuario> query = em.createQuery("SELECT u FROM Usuario u WHERE u.email = :email AND u.senha = :senha", Usuario.class);
        query.setParameter("email", email);
        query.setParameter("senha", senha);
        
        Usuario usuario = query.getSingleResult();
        
        if (usuario != null) {
            request.getSession().setAttribute("usuario", usuario);
            response.sendRedirect("home.jsp");
        }
    } catch (NoResultException e) {
        // Nenhum usuário encontrado
        request.setAttribute("errorMessage", "E-mail ou senha incorretos.");
        request.getRequestDispatcher("index.jsp").forward(request, response);
    } catch (Exception e) {
       // Imprime o stack trace para detalhes completos do erro
    e.printStackTrace();
    request.setAttribute("errorMessage", "Ocorreu um erro interno: " + e.getMessage());
    request.getRequestDispatcher("index.jsp").forward(request, response);

    } finally {
        em.close();
    }
}

    @Override
    public void destroy() {
        emf.close();
    }
}
