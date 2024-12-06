package com.pw.servlet;


import com.pw.entity.Usuario;
import java.io.IOException;
import javax.persistence.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import org.mindrot.jbcrypt.BCrypt;
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
    String confirmSenha = request.getParameter("confirm-senha");

    // Verificar se as senhas coincidem
    if (!senha.equals(confirmSenha)) {
        response.sendRedirect("ImovelServlet?erroCadastro=senhas_nao_coincidem");
        return;
    }

    // Verificar critérios de segurança da senha
    String senhaRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$";
    if (!senha.matches(senhaRegex)) {
        response.sendRedirect("ImovelServlet?erroCadastro=senha_invalida");
        return;
    }

    EntityManager em = emf.createEntityManager();
    try {
        // Verificar se o e-mail já existe
        long count = em.createQuery("SELECT COUNT(u) FROM Usuario u WHERE u.email = :email", Long.class)
                .setParameter("email", email)
                .getSingleResult();

        if (count > 0) {
            response.sendRedirect("ImovelServlet?erroCadastro=email_existente");
            return;
        }

        // Criptografar a senha
        String senhaCriptografada = BCrypt.hashpw(senha, BCrypt.gensalt());

        // Criar o novo usuário
        Usuario usuario = new Usuario();
        usuario.setNome(nome);
        usuario.setEmail(email);
        usuario.setSenha(senhaCriptografada);

        em.getTransaction().begin();
        em.persist(usuario);
        em.getTransaction().commit();

        response.sendRedirect("ImovelServlet");
    } finally {
        em.close();
    }
}

 else
   if ("login".equals(action)) {
    String email = request.getParameter("email");
    String senha = request.getParameter("senha");

    EntityManager em = emf.createEntityManager();
    try {
        // Verificar se o e-mail existe
        Usuario usuario = em.createQuery("SELECT u FROM Usuario u WHERE u.email = :email", Usuario.class)
                .setParameter("email", email)
                .getSingleResult();

        // Verificar se a senha está correta usando BCrypt
        if (!BCrypt.checkpw(senha, usuario.getSenha())) {
            response.sendRedirect("ImovelServlet?erroLogin=senha_invalida");
            return;
        }

        // Armazenar o usuário na sessão
        HttpSession session = request.getSession();
        session.setAttribute("usuarioId", usuario.getId());
        session.setAttribute("usuarioNome", usuario.getNome());
        session.setAttribute("usuarioEmail", usuario.getEmail());

        response.sendRedirect("ImovelServlet");
    } catch (NoResultException e) {
        response.sendRedirect("ImovelServlet?erroLogin=email_nao_encontrado");
    } finally {
        em.close();
    }
}
 
        else if ("logout".equals(action)) {
            HttpSession session = request.getSession();
            session.invalidate(); // Invalida a sessão atual
            response.sendRedirect("ImovelServlet");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
