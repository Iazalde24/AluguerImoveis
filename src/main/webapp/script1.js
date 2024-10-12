document.getElementById('createAccount').addEventListener('click', function(e) {
    e.preventDefault();
    
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Simulação de carregamento antes da troca de formulário
    loginForm.style.opacity = '0.5';
    
    setTimeout(function() {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        registerForm.style.opacity = '1';
    }, 1000); // Animação de 1 segundo
});

document.getElementById('goToLogin').addEventListener('click', function(e) {
    e.preventDefault();
    
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Simulação de carregamento antes da troca de formulário
    registerForm.style.opacity = '0.5';
    
    setTimeout(function() {
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        loginForm.style.opacity = '1';
    }, 1000); // Animação de 1 segundo
});
