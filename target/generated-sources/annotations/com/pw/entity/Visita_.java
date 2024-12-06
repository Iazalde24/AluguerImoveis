package com.pw.entity;

import com.pw.entity.Imovel;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.12.v20230209-rNA", date="2024-12-06T08:06:34")
@StaticMetamodel(Visita.class)
public class Visita_ { 

    public static volatile SingularAttribute<Visita, Date> dataVisita;
    public static volatile SingularAttribute<Visita, String> mensagem;
    public static volatile SingularAttribute<Visita, Imovel> imovelId;
    public static volatile SingularAttribute<Visita, String> nome;
    public static volatile SingularAttribute<Visita, Long> id;
    public static volatile SingularAttribute<Visita, String> email;
    public static volatile SingularAttribute<Visita, String> status;

}