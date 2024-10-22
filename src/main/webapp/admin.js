document.addEventListener('DOMContentLoaded', () => {
    feather.replace();

    const properties = [
        { id: 1, title: 'Moradia T3 na Baixa-Paquite', location: 'Av. Marginal', price: '18,000', status: 'Disponível' },
        { id: 2, title: 'Apartamento T1 ao pé da praia do Wimbe', location: 'Wimbe', price: '95,000', status: 'Reservado' }
    ];

    const propertyList = document.getElementById('propertyList');
    const addPropertyBtn = document.getElementById('addPropertyBtn');

    function renderProperties() {
        propertyList.innerHTML = '';
        properties.forEach(property => {
            const propertyItem = document.createElement('div');
            propertyItem.className = 'property-item';
            propertyItem.innerHTML = `
                <div>
                    <strong>${property.title}</strong>
                    <span>${property.location}</span>
                </div>
                <div>MZN ${property.price}</div>
                <div>${property.status}</div>
                <div class="property-item-actions">
                    <button class="btn btn-primary edit-property" data-id="${property.id}">
                        <i data-feather="edit"></i>
                    </button>
                    <button class="btn btn-danger delete-property" data-id="${property.id}">
                        <i data-feather="trash-2"></i>
                    </button>
                </div>
            `;
            propertyList.appendChild(propertyItem);
        });
        feather.replace();
    }

    // Initialize Charts
    const ctxProperty = document.getElementById('propertyChart').getContext('2d');
    const propertyChart = new Chart(ctxProperty, {
        type: 'doughnut',
        data: {
            labels: ['Disponível', 'Reservado', 'Vendido'],
            datasets: [{
                data: [8, 5, 2],
                backgroundColor: ['#4caf50', '#ff9800', '#f44336']
            }]
        }
    });

    const ctxUser = document.getElementById('userChart').getContext('2d');
    const userChart = new Chart(ctxUser, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Novos Usuários',
                data: [50, 60, 70, 100, 80],
                backgroundColor: '#4a148c'
            }]
        }
    });

    // Initial render
    renderProperties();
});
