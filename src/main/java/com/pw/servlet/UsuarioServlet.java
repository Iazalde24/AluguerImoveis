package com.pw.servlet;

import com.pw.entity.Usuario;
import javax.persistence.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/UsuarioServlet")
public class UsuarioServlet extends HttpServlet {
    
    private EntityManagerFactory emf = Persistence.createEntityManagerFactory("aluguerPU");

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");

        // Processamento de Cadastro de Usuário
        if ("cadastrar".equals(action)) {
            String nome = request.getParameter("nome");
            String email = request.getParameter("email");
            String senha = request.getParameter("senha");

            EntityManager em = emf.createEntityManager();
            Usuario usuario = new Usuario();
            usuario.setNome(nome);
            usuario.setEmail(email);
            usuario.setSenha(senha);

            em.getTransaction().begin();
            em.persist(usuario);
            em.getTransaction().commit();
            em.close();

            response.sendRedirect("ImovelServlet"); // Redireciona para a página principal após o cadastro
        }
        // Processamento de Login de Usuário
        else if ("login".equals(action)) {
            String email = request.getParameter("email");
            String senha = request.getParameter("senha");

            EntityManager em = emf.createEntityManager();
            try {
                Usuario usuario = em.createQuery("SELECT u FROM Usuario u WHERE u.email = :email AND u.senha = :senha", Usuario.class)
                        .setParameter("email", email)
                        .setParameter("senha", senha)
                        .getSingleResult();

                // Armazenar o usuário na sessão após login bem-sucedido
                HttpSession session = request.getSession();
                session.setAttribute("usuarioId", usuario.getId());
                session.setAttribute("usuarioNome", usuario.getNome());
                session.setAttribute("usuarioEmail", usuario.getEmail());
                response.sendRedirect("ImovelServlet"); // Redireciona para a página principal após o login
            } catch (NoResultException e) {
                response.sendRedirect("index.jsp?erro=login"); // Redireciona com mensagem de erro
            } finally {
                em.close();
            }
        }
        // Processamento de Logout
        else if ("logout".equals(action)) {
            HttpSession session = request.getSession();
            session.invalidate(); // Invalida a sessão atual
            response.sendRedirect("ImovelServlet"); // Redireciona para a página inicial após logout
        }
    }
    @Override
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    String action = request.getParameter("action");

    if ("logout".equals(action)) {
        HttpSession session = request.getSession();
        session.invalidate(); // Invalida a sessão atual
      response.sendRedirect("ImovelServlet"); // Redireciona para a página inicial após logout
    } else {
        // Redireciona para o POST para outras ações
        doPost(request, response);
    }
}

}
