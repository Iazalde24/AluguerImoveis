// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Dropdown functionality for mobile
const dropdownMenus = document.querySelectorAll('.dropdown-menu');

dropdownMenus.forEach(menu => {
    menu.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            menu.classList.toggle('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navList.contains(e.target) && !mobileMenu.contains(e.target)) {
        navList.classList.remove('active');
        mobileMenu.classList.remove('active');
        dropdownMenus.forEach(menu => menu.classList.remove('active'));
    }
});

// Show content function
function showContent(contentId) {
    const content = document.getElementById('content');
    switch (contentId) {
        case 'home':
            content.innerHTML = '<h2>Bem-vindo à Imobiliaria de Pemba</h2><p>Explore os melhores imóveis de Pemba.</p>';
            break;
        case 'imoveis':
            content.innerHTML = '<h2>Todos os Imóveis</h2><p>Aqui estão todos os imóveis disponíveis.</p>';
            break;
        case 'sobre':
            content.innerHTML = '<h2>Sobre Nós</h2><p>Somos uma imobiliária especializada em Pemba.</p>';
            break;
        case 'contacto':
            content.innerHTML = '<h2>Contato</h2><p>Entre em contato conosco pelo telefone: +258 84 123 4567</p>';
            break;
    }
}

// Show login/register form
function showForm(formType) {
    document.getElementById(`${formType}-overlay`).style.display = 'block';
}

// Close login/register form
function closeForm(formType) {
    document.getElementById(`${formType}-overlay`).style.display = 'none';
}

// Handle form submissions (implement proper form handling in a real application)
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Login submitted');
    closeForm('login');
});

document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Registration submitted');
    closeForm('register');
});

// Initialize the page with home content
showContent('home');