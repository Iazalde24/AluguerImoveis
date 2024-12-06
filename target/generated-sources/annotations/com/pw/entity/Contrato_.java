package com.pw.entity;

import com.pw.entity.Imovel;
import com.pw.entity.Usuario;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.12.v20230209-rNA", date="2024-12-06T04:02:42")
@StaticMetamodel(Contrato.class)
public class Contrato_ { 

    public static volatile SingularAttribute<Contrato, Date> dataFim;
    public static volatile SingularAttribute<Contrato, Imovel> imovelId;
    public static volatile SingularAttribute<Contrato, Long> id;
    public static volatile SingularAttribute<Contrato, Date> dataInicio;
    public static volatile SingularAttribute<Contrato, Usuario> usuarioId;
    public static volatile SingularAttribute<Contrato, String> status;

}