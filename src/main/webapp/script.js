
// Função que alterna a exibição das seções
function showContent(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none'; // Ocultar todas as seções
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block'; // Mostrar a seção ativa
    }

    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Chama a função quando a página carrega
window.onload = function() {
    addManagePropertiesOption(); // Verifica e adiciona o item "Gerenciar Imóveis"
};

// Simular login
// localStorage.setItem('loggedIn', 'true'); // Ativa o login
// localStorage.removeItem('loggedIn'); // Remove o estado de login para simular logout

function showContent(sectionId) {
    // Esconder todas as seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none'; // Ocultar todas as seções
    });

    // Exibir a seção correspondente
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block'; // Mostrar a seção ativa
    } else {
        console.error(`Seção com ID "${sectionId}" não encontrada.`);
    }

    // Gerenciar o estado do menu ativo
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    } else {
        console.error(`Link com href="#${sectionId}" não encontrado no menu.`);
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
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});