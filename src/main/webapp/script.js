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
    }else if (section === 'imoveis') {
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

document.getElementById('user-avatar').addEventListener('click', function () {
    const avatar = document.querySelector('.avatar');
    avatar.classList.toggle('active');
    const dropdown = document.getElementById('user-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('menu-toggle').addEventListener('click', function () {
    const navList = document.getElementById('nav-list');
    navList.classList.toggle('active');
});

// Function to handle content display dynamically
function showContent(section) {
    const content = document.getElementById('content');
    switch (section) {
        case 'home':
            content.innerHTML = '<h2>Bem-vindo ao Imóveis Moz</h2><p>Explore os melhores imóveis de Moçambique.</p>';
            break;
        case 'imoveis':
            content.innerHTML = '<h2>Imóveis Disponíveis</h2><p>Aqui estão todos os imóveis listados.</p>';
            break;
        case 'sobre':
            content.innerHTML = '<h2>Sobre Nós</h2><p>Somos uma empresa especializada na venda e aluguer de imóveis.</p>';
            break;
        case 'contacto':
            content.innerHTML = '<h2>Contacto</h2><p>Fale conosco pelo telefone +258 84 123 4567.</p>';
            break;
    }
}

// script.js

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Show content function (you need to implement this based on your needs)
function showContent(contentId) {
    // Implement content switching logic here
    console.log(`Showing content for: ${contentId}`);
}

// Show login/register form
function showForm(formType) {
    document.getElementById(`${formType}-overlay`).style.display = 'block';
}

// Close login/register form
function closeForm(formType) {
    document.getElementById(`${formType}-overlay`).style.display = 'none';
}

// Handle form submissions (you should implement proper form handling)
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Implement login logic here
    console.log('Login submitted');
});

document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Implement registration logic here
    console.log('Registration submitted');
});