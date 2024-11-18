/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pw.entity;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Edilson
 */
@Entity
@Table(name = "imovel")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Imovel.findAll", query = "SELECT i FROM Imovel i"),
    @NamedQuery(name = "Imovel.findById", query = "SELECT i FROM Imovel i WHERE i.id = :id"),
    @NamedQuery(name = "Imovel.findByTipo", query = "SELECT i FROM Imovel i WHERE i.tipo = :tipo"),
    @NamedQuery(name = "Imovel.findByDisponivel", query = "SELECT i FROM Imovel i WHERE i.disponivel = :disponivel"),
    @NamedQuery(name = "Imovel.findByLocalizacao", query = "SELECT i FROM Imovel i WHERE i.localizacao = :localizacao"),
    @NamedQuery(name = "Imovel.findByDescricao", query = "SELECT i FROM Imovel i WHERE i.descricao = :descricao"),
    @NamedQuery(name = "Imovel.findByPreco", query = "SELECT i FROM Imovel i WHERE i.preco = :preco")})
public class Imovel implements Serializable {

    @Size(max = 255)
    @Column(name = "tipo")
    private String tipo;
    @Basic(optional = false)
    @NotNull()
    @Column(name = "disponivel")
    private boolean disponivel;
    @Basic(optional = false)
    @NotNull()
    @Size(min = 1, max = 255)
    @Column(name = "localizacao")
    private String localizacao;
    @Size(max = 255)
    @Column(name = "descricao")
    private String descricao;
    @Lob()
    @Column(name = "imagem")
    private byte[] imagem;
    @Basic(optional = false)
    @NotNull()
    @Column(name = "preco")
    private double preco;
    @OneToMany(mappedBy = "imovelId")
    private Collection<Contrato> contratoCollection;
    @OneToMany(mappedBy = "imovelId")
    private Collection<Visita> visitaCollection;
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    @ManyToOne
    private Usuario usuarioId;

    public Imovel() {
    }

    public Imovel(Long id) {
        this.id = id;
    }

    public Imovel(Long id, boolean disponivel, String localizacao, double preco) {
        this.id = id;
        this.disponivel = disponivel;
        this.localizacao = localizacao;
        this.preco = preco;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Usuario getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Usuario usuarioId) {
        this.usuarioId = usuarioId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Imovel)) {
            return false;
        }
        Imovel other = (Imovel) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.pw.entity.Imovel[ id=" + id + " ]";
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public boolean getDisponivel() {
        return disponivel;
    }

    public void setDisponivel(boolean disponivel) {
        this.disponivel = disponivel;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public byte[] getImagem() {
        return imagem;
    }

    public void setImagem(byte[] imagem) {
        this.imagem = imagem;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    @XmlTransient
    public Collection<Contrato> getContratoCollection() {
        return contratoCollection;
    }

    public void setContratoCollection(Collection<Contrato> contratoCollection) {
        this.contratoCollection = contratoCollection;
    }

    @XmlTransient
    public Collection<Visita> getVisitaCollection() {
        return visitaCollection;
    }

    public void setVisitaCollection(Collection<Visita> visitaCollection) {
        this.visitaCollection = visitaCollection;
    }
    
}
