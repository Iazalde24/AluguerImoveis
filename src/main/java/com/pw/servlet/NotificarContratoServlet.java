package com.pw.servlet;
import com.pw.entity.Usuario;
import com.pw.entity.*;
import java.io.IOException;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceUnit;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.*;
@WebServlet("/NotificarContratoServlet")
public class NotificarContratoServlet extends HttpServlet {

    private EntityManagerFactory emf = Persistence.createEntityManagerFactory("aluguerPU");

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        EntityManager em = emf.createEntityManager();
        HttpSession session = request.getSession();
        Long usuarioId = (Long) session.getAttribute("usuarioId");

        try {
            // Verificar se o usuário é o proprietário do imóvel (usuarioId é o ID do proprietário)
            List<Contrato> contratosPendentes = em.createQuery("SELECT c FROM Contrato c WHERE c.imovelId.usuarioId.id = :usuarioId AND c.status = 'PENDENTE'", Contrato.class)
                    .setParameter("usuarioId", usuarioId)
                    .getResultList();

            request.setAttribute("contratosPendentes", contratosPendentes);
            request.getRequestDispatcher("notificar.jsp").forward(request, response);

        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Erro ao carregar contratos.");
        } finally {
            em.close();
        }
    }
}
