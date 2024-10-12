function showContent(section) {
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(`a[href="#${section}"]`);
    activeLink.classList.add('active');

    const content = document.getElementById('content');
    if (section === 'home') {
        content.innerHTML = '<h2>Bem-vindo ao Imóveis Moz!</h2><p>Escolha uma das opções acima para ver mais informações.</p>';
    } else if (section === 'categorias') {
        content.innerHTML = '<h2>Categorias</h2><p>Aqui estão as categorias de imóveis disponíveis.</p>';
    } else if (section === 'imoveis') {
        content.innerHTML = '<h2>Todos os Imóveis</h2><p>Veja aqui todos os imóveis disponíveis para aluguel.</p>';
    } else if (section === 'sobre') {
        content.innerHTML = '<h2>Sobre Nós</h2><p>Imóveis Moz é uma plataforma dedicada à locação de imóveis.</p>';
    } else if (section === 'contacto') {
        content.innerHTML = '<h2>Contacto</h2><p>Entre em contato conosco pelo email: contato@imoveis.mz</p>';
    }
}

// Função para alternar o dropdown do avatar
document.getElementById('user-avatar').addEventListener('click', function(event) {
    event.stopPropagation();  // Impede o clique de propagar para outros elementos
    this.classList.toggle('active'); // Ativa/desativa o dropdown

    const arrow = document.getElementById('dropdown-arrow');
    if (this.classList.contains('active')) {
        arrow.classList.remove('arrow-down');
        arrow.classList.add('arrow-up');
    } else {
        arrow.classList.remove('arrow-up');
        arrow.classList.add('arrow-down');
    }
});

// Ocultar o dropdown se clicar fora dele
window.addEventListener('click', function() {
    const avatar = document.getElementById('user-avatar');
    avatar.classList.remove('active');

    const arrow = document.getElementById('dropdown-arrow');
    arrow.classList.remove('arrow-up');
    arrow.classList.add('arrow-down');
});
