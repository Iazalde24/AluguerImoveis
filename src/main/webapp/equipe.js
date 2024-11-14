// Dados das equipes (simulando um banco de dados)
const teams = [
    {
        id: 1,
        name: 'Equipe Frontend',
        category: 'desenvolvimento',
        image: '/api/placeholder/400/200',
        members: [
            { name: 'Ana Silva', role: 'Tech Lead' },
            { name: 'Pedro Santos', role: 'Desenvolvedor Senior' },
            { name: 'Maria Oliveira', role: 'UX Designer' }
        ]
    },
    {
        id: 2,
        name: 'Equipe Design',
        category: 'design',
        image: '/api/placeholder/400/200',
        members: [
            { name: 'João Costa', role: 'Design Lead' },
            { name: 'Carla Lima', role: 'UI Designer' }
        ]
    },
    {
        id: 3,
        name: 'Equipe Backend',
        category: 'desenvolvimento',
        image: '/api/placeholder/400/200',
        members: [
            { name: 'Lucas Mendes', role: 'Arquiteto de Software' },
            { name: 'Julia Fernandes', role: 'DevOps' },
            { name: 'Rafael Castro', role: 'Desenvolvedor Backend' }
        ]
    },
    {
        id: 4,
        name: 'Equipe Marketing Digital',
        category: 'marketing',
        image: '/api/placeholder/400/200',
        members: [
            { name: 'Isabella Santos', role: 'Marketing Manager' },
            { name: 'Gabriel Alves', role: 'Social Media' },
            { name: 'Beatriz Lima', role: 'Content Creator' }
        ]
    }
];

// Função para criar um card de equipe
function createTeamCard(team) {
    return `
        <div class="team-card" data-category="${team.category}">
            <img src="${team.image}" alt="${team.name}" class="team-image">
            <div class="team-content">
                <span class="team-category">${team.category.charAt(0).toUpperCase() + team.category.slice(1)}</span>
                <h3 class="team-title">${team.name}</h3>
                <div class="team-members">
                    ${team.members.map(member => `
                        <div class="member">
                            <i class="fas fa-user"></i>
                            <span>${member.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Função para renderizar todas as equipes
function renderTeams(filter = 'all') {
    const teamsGrid = document.getElementById('teamsGrid');
    const filteredTeams = filter === 'all' 
        ? teams 
        : teams.filter(team => team.category === filter);
    
    teamsGrid.innerHTML = filteredTeams.map(createTeamCard).join('');
}

// Configurar filtros
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => 
            btn.classList.remove('active'));
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        // Filter teams
        const filter = e.target.dataset.filter;
        renderTeams(filter);
    });
});

// Animação suave ao scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Inicializar a página
document.addEventListener('DOMContentLoaded', () => {
    renderTeams();
});