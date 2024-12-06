package com.pw.servlet;

import com.pw.entity.Contrato;
import com.pw.entity.Imovel;
import com.pw.entity.Visita;
import java.io.IOException;
import java.util.Date;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/AtualizarStatusServlet")
public class AtualizarStatusServlet extends HttpServlet {
    private EntityManagerFactory emf;

    @Override
    public void init() {
        emf = Persistence.createEntityManagerFactory("aluguerPU");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        EntityManager em = emf.createEntityManager();
        String tipo = request.getParameter("tipo");
        Long id = Long.parseLong(request.getParameter("id"));
        String novoStatus = request.getParameter("status");

        try {
            em.getTransaction().begin();

            if ("visita".equals(tipo)) {
                Visita visita = em.find(Visita.class, id);
                visita.setStatus(novoStatus);

                // Aprovar visita cria um contrato automaticamente
                if ("APROVADA".equals(novoStatus)) {
                    Contrato contrato = new Contrato();
                    contrato.setImovelId(visita.getImovelId());
                    contrato.setUsuarioId(visita.getImovelId().getUsuarioId());
                    contrato.setDataInicio(new Date());
                    contrato.setStatus("ATIVO");
                    em.persist(contrato);

                    // Tornar imóvel indisponível
                    Imovel imovel = visita.getImovelId();
                    imovel.setDisponivel(false);
                }
            } else if ("contrato".equals(tipo)) {
                Contrato contrato = em.find(Contrato.class, id);
                contrato.setStatus(novoStatus);

                // Tornar imóvel indisponível ao aprovar contrato
                if ("APROVADA".equals(novoStatus)) {
                    Imovel imovel = contrato.getImovelId();
                    imovel.setDisponivel(false);
                }
            }

            em.getTransaction().commit();
            response.getWriter().write("Status atualizado com sucesso.");
        } catch (Exception e) {
            em.getTransaction().rollback();
            response.getWriter().write("Erro ao atualizar status.");
        } finally {
            em.close();
        }
    }

    @Override
    public void destroy() {
        if (emf != null) emf.close();
    }
}
