class Imovel {
    constructor(titulo, tipo, localizacao, preco, estado, contrato, contato, imgUrl) {
        this.titulo = titulo;
        this.tipo = tipo;
        this.localizacao = localizacao;
        this.preco = preco;
        this.estado = estado;
        this.contrato = contrato;
        this.contato = contato;
        this.imgUrl = imgUrl;
    }

    render() {
        let block = document.createElement('div');
        block.className = 'imovel-block';
        
        block.innerHTML = `
            <div class="imovel-image" style="background-image: url('${this.imgUrl}')"></div>
            <div class="imovel-info">
                <h3>${this.titulo}</h3>
                <p>Tipo: ${this.tipo}</p>
                <p>Localização: ${this.localizacao}</p>
                <p>Preço: MZN ${this.preco}</p>
                <p>Estado: <span class="${this.estado.toLowerCase()}">${this.estado}</span></p>
                <p>Contrato: ${this.contrato}</p>
                <p>Contato: ${this.contato}</p>
            </div>
        `;

        block.addEventListener('click', () => {
            window.location.href = `detalhes.html?titulo=${this.titulo}`;
        });

        return block;
    }
}

const imoveis = [
    new Imovel('Moradia T3 na Julius Nyerere', 'Moradia', 'Av. Julius Nyerere', '18,000', 'Disponível', 'Renda', '843567890', 'i3.jpeg'),
    new Imovel('Apartamento T1 Sommershield', 'Apartamento', 'Sommershield', '95,000', 'Reservado', 'Renda', '843567890', 'i2.jpg'),
    new Imovel('Escritório mobiliado', 'Escritório', 'Sommershield I', '110,000', 'Indisponível', 'Venda', '843567890', 'i.png'),
];

const container = document.getElementById('imoveis-container');
const container2 = document.getElementById('imoveis-destaques-container');

imoveis.forEach(imovel => {
    container.appendChild(imovel.render());
    container2.appendChild(imovel.render());
});
