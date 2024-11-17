package com.pw.entity;

import com.pw.entity.Usuario;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.12.v20230209-rNA", date="2024-11-17T17:42:07")
@StaticMetamodel(Imovel.class)
public class Imovel_ { 

    public static volatile SingularAttribute<Imovel, Double> preco;
    public static volatile SingularAttribute<Imovel, String> tipo;
    public static volatile SingularAttribute<Imovel, String> localizacao;
    public static volatile SingularAttribute<Imovel, byte[]> imagem;
    public static volatile SingularAttribute<Imovel, Boolean> disponivel;
    public static volatile SingularAttribute<Imovel, Long> id;
    public static volatile SingularAttribute<Imovel, Usuario> usuarioId;
    public static volatile SingularAttribute<Imovel, String> descricao;

}