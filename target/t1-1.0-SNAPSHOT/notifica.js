// Dados mockados para exemplo
const mockNotifications = [
    {
        id: 1,
        title: "Novo Contrato Pendente",
        message: "Contrato #12345 aguardando revisão e aprovação.",
        type: "contract",
        priority: "high",
        status: "pending",
        timestamp: new Date(2024, 10, 10, 9, 30),
        assignee: null,
        comments: [],
        changes: [
            { field: "status", from: "draft", to: "pending", timestamp: new Date(2024, 10, 10, 9, 30) }
        ]
    },
    {
        id: 2,
        title: "Visita Agendada",
        message: "Cliente João da Silva agendou visita para o imóvel #789.",
        type: "visit",
        priority: "medium",
        status: "pending",
        timestamp: new Date(2024, 10, 9, 14, 15),
        assignee: null,
        comments: [],
        changes: []
    },
    // Adicione mais notificações mock conforme necessário
];

class NotificationSystem {
    constructor() {
        this.notifications = [...mockNotifications];
        this.filters = {
            types: ["property", "user", "contract", "visit"],
            priorities: ["high", "medium", "low"],
            status: ["pending", "in_progress", "completed"],
            period: "all"
        };
        this.initializeElements();
        this.setupEventListeners();
        this.render();
    }

    initializeElements() {
        // Elementos principais
        this.menuToggle = document.getElementById('menuToggle');
        this.sidebar = document.querySelector('.sidebar');
        this.searchInput = document.getElementById('searchNotifications');
        this.filterBtn = document.getElementById('filterBtn');
        this.filterDropdown = document.getElementById('filterDropdown');
        this.markAllReadBtn = document.getElementById('markAllRead');
        this.notificationTemplate = document.getElementById('notificationTemplate');
        
        // Containers de notificações
        this.todayContainer = document.getElementById('todayNotifications');
        this.yesterdayContainer = document.getElementById('yesterdayNotifications');
        this.weekContainer = document.getElementById('weekNotifications');
        
        // Modais
        this.detailsModal = document.getElementById('detailsModal');
        this.assignModal = document.getElementById('assignModal');
    }

    setupEventListeners() {
        // Event listeners para elementos principais
        this.menuToggle.addEventListener('click', () => this.toggleSidebar());
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        this.filterBtn.addEventListener('click', () => this.toggleFilterDropdown());
        this.markAllReadBtn.addEventListener('click', () => this.markAllAsRead());

        // Event listeners para filtros
        document.getElementById('periodFilter').addEventListener('change', (e) => {
            this.handlePeriodChange(e.target.value);
        });

        document.getElementById('applyFilters').addEventListener('click', () => {
            this.applyFilters();
            this.toggleFilterDropdown();
        });

        document.getElementById('clearFilters').addEventListener('click', () => {
            this.clearFilters();
        });

        // Fechar dropdown de filtros quando clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.filter-box') && this.filterDropdown.style.display === 'block') {
                this.toggleFilterDropdown();
            }
        });
    }

    toggleSidebar() {
        this.sidebar.classList.toggle('show');
    }

    handleSearch(query) {
        const filteredNotifications = this.notifications.filter(notification => 
            notification.title.toLowerCase().includes(query.toLowerCase()) ||
            notification.message.toLowerCase().includes(query.toLowerCase())
        );
        this.renderNotifications(filteredNotifications);
    }

    toggleFilterDropdown() {
        this.filterDropdown.style.display = 
            this.filterDropdown.style.display === 'block' ? 'none' : 'block';
    }

    handlePeriodChange(period) {
        const customDateRange = document.querySelector('.custom-date-range');
        customDateRange.style.display = period === 'custom' ? 'block' : 'none';
        this.filters.period = period;
    }

    applyFilters() {
        // Coletar valores dos checkboxes
        const typeChecks = document.querySelectorAll('input[type="checkbox"][value^="property"], input[type="checkbox"][value^="user"], input[type="checkbox"][value^="contract"], input[type="checkbox"][value^="visit"]');
        const priorityChecks = document.querySelectorAll('input[type="checkbox"][value^="high"], input[type="checkbox"][value^="medium"], input[type="checkbox"][value^="low"]');
        const statusChecks = document.querySelectorAll('input[type="checkbox"][value^="pending"], input[type="checkbox"][value^="in_progress"], input[type="checkbox"][value^="completed"]');

        this.filters.types = Array.from(typeChecks)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        this.filters.priorities = Array.from(priorityChecks)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        this.filters.status = Array.from(statusChecks)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        this.render();
    }

    clearFilters() {
        const checkboxes = this.filterDropdown.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => cb.checked = true);
        document.getElementById('periodFilter').value = 'all';
        document.querySelector('.custom-date-range').style.display = 'none';
        
        this.filters = {
            types: ["property", "user", "contract", "visit"],
            priorities: ["high", "medium", "low"],
            status: ["pending", "in_progress", "completed"],
            period: "all"
        };

        this.render();
    }

    markAllAsRead() {
        this.notifications.forEach(notification => {
            if (notification.status === 'pending') {
                notification.status = 'completed';
                this.addChange(notification, 'status', 'pending', 'completed');
            }
        });
        this.render();
        this.showToast('Todas as notificações foram marcadas como lidas');
    }

    addChange(notification, field, fromValue, toValue) {
        notification.changes.push({
            field,
            from: fromValue,
            to: toValue,
            timestamp: new Date()
        });
    }

    showToast(message) {
        const toast = document.getElementById('notificationToast');
        const messageEl = toast.querySelector('.toast-message');
        messageEl.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    getNotificationElement(notification) {
        const template = this.notificationTemplate.content.cloneNode(true);
        const notificationEl = template.querySelector('.notification-item');
        
        // Configurar prioridade
        const priorityEl = notificationEl.querySelector('.notification-priority');
        priorityEl.classList.add(notification.priority);
        
        // Configurar ícone
        const iconEl = notificationEl.querySelector('.notification-icon i');
        iconEl.classList.add(this.getNotificationIcon(notification.type));
        
        // Configurar conteúdo
        notificationEl.querySelector('.notification-title').textContent = notification.title;
        notificationEl.querySelector('.notification-message').textContent = notification.message;
        notificationEl.querySelector('.notification-time').textContent = this.formatTimestamp(notification.timestamp);
        notificationEl.querySelector('.notification-type').textContent = this.capitalizeFirstLetter(notification.type);
        
        // Configurar ações
        this.setupNotificationActions(notificationEl, notification);
        
        return notificationEl;
    }

    setupNotificationActions(element, notification) {
        const viewDetailsBtn = element.querySelector('.view-details');
        const addCommentBtn = element.querySelector('.add-comment');
        const assignToBtn = element.querySelector('.assign-to');
        const markReadBtn = element.querySelector('.mark-read');

        viewDetailsBtn.addEventListener('click', () => this.showDetailsModal(notification));
        addCommentBtn.addEventListener('click', () => this.toggleComments(element, notification));
        assignToBtn.addEventListener('click', () => this.showAssignModal(notification));
        markReadBtn.addEventListener('click', () => this.markAsRead(notification));
    }

    showDetailsModal(notification) {
        const modal = this.detailsModal;
        
        // Preencher detalhes
        modal.querySelector('#detailType').textContent = this.capitalizeFirstLetter(notification.type);
        modal.querySelector('#detailPriority').textContent = this.capitalizeFirstLetter(notification.priority);
        modal.querySelector('#detailDate').textContent = this.formatTimestamp(notification.timestamp);
        modal.querySelector('#detailStatus').textContent = this.capitalizeFirstLetter(notification.status);
        modal.querySelector('#detailAssignee').textContent = notification.assignee || 'Não atribuído';
        modal.querySelector('#detailDescription').textContent = notification.message;

        // Preencher histórico de alterações
        const historyContainer = modal.querySelector('#detailHistory');
        historyContainer.innerHTML = '';
        notification.changes.forEach(change => {
            const changeEl = document.createElement('div');
            changeEl.classList.add('history-item');
            changeEl.innerHTML = `
                <span class="timestamp">${this.formatTimestamp(change.timestamp)}</span>
                <span class="change-description">
                    ${this.capitalizeFirstLetter(change.field)} alterado de 
                    <strong>${change.from}</strong> para 
                    <strong>${change.to}</strong>
                </span>
            `;
            historyContainer.appendChild(changeEl);
        });

        modal.style.display = 'block';

        // Configurar botões
        const closeButtons = modal.querySelectorAll('.close-btn, .close-modal');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        });
    }

    showAssignModal(notification) {
        const modal = this.assignModal;
        
        // Mockup de usuários para exemplo
        const users = [
            { id: 1, name: 'Ana Silva', role: 'Agente' },
            { id: 2, name: 'Carlos Santos', role: 'Supervisor' },
            { id: 3, name: 'Maria Oliveira', role: 'Agente' }
        ];

        const usersList = modal.querySelector('.users-list');
        usersList.innerHTML = '';
        
        users.forEach(user => {
            const userEl = document.createElement('div');
            userEl.classList.add('user-item');
            userEl.innerHTML = `
                <input type="radio" name="assign-user" value="${user.id}">
                <div class="user-info">
                    <span class="user-name">${user.name}</span>
                    <span class="user-role">${user.role}</span>
                </div>
            `;
            usersList.appendChild(userEl);
        });

        modal.style.display = 'block';

        // Configurar botões
        const closeButtons = modal.querySelectorAll('.close-btn, .close-modal');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        });

        const assignButton = modal.querySelector('#assignAction');
        assignButton.onclick = () => {
            const selectedUser = modal.querySelector('input[name="assign-user"]:checked');
            if (selectedUser) {
                const user = users.find(u => u.id === parseInt(selectedUser.value));
                notification.assignee = user.name;
                this.addChange(notification, 'assignee', 'Não atribuído', user.name);
                this.render();
                this.showToast(`Notificação atribuída para ${user.name}`);
                modal.style.display = 'none';
            }
        };
    }

    toggleComments(element, notification) {
        const commentsSection = element.querySelector('.notification-comments');
        const isVisible = commentsSection.style.display === 'block';
        
        if (!isVisible) {
            // Renderizar comentários existentes
            const commentsList = commentsSection.querySelector('.comments-list');
            commentsList.innerHTML = '';
            notification.comments.forEach(comment => {
                const commentEl = document.createElement('div');
                commentEl.classList.add('comment');
                commentEl.innerHTML = `
                    <div class="comment-header">
                        <span class="comment-author">${comment.author}</span>
                        <span class="comment-time">${this.formatTimestamp(comment.timestamp)}</span>
                    </div>
                    <div class="comment-text">${comment.text}</div>
                `;
                commentsList.appendChild(commentEl);
            });

            // Configurar formulário de comentário
            const commentForm = commentsSection.querySelector('.comment-form');
            const commentInput = commentForm.querySelector('input');
            const sendButton = commentForm.querySelector('.send-comment');

            sendButton.onclick = () => {
                const commentText = commentInput.value.trim();
                if (commentText) {
                    const comment = {
                        author: 'João Silva', // Usuário mockado
                        text: commentText,
                        timestamp: new Date()
                    };
                    notification.comments.push(comment);
                    
                    // Adicionar novo comentário à lista
                    const commentEl = document.createElement('div');
                    commentEl.classList.add('comment');
                    commentEl.innerHTML = `
                        <div class="comment-header">
                            <span class="comment-author">${comment.author}</span>
                            <span class="comment-time">${this.formatTimestamp(comment.timestamp)}</span>
                        </div>
                        <div class="comment-text">${comment.text}</div>
                    `;
                    commentsList.appendChild(commentEl);
                    
                    commentInput.value = '';
                }
            };
        }

        commentsSection.style.display = isVisible ? 'none' : 'block';
    }

    markAsRead(notification) {
        if (notification.status !== 'completed') {
            const oldStatus = notification.status;
            notification.status = 'completed';
            this.addChange(notification, 'status', oldStatus, 'completed');
            this.render();
            this.showToast('Notificação marcada como lida');
        }
    }

    getNotificationIcon(type) {
        const icons = {
            property: 'fa-home',
            user: 'fa-user',
            contract: 'fa-file-signature',
            visit: 'fa-calendar-check'
        };
        return icons[type] || 'fa-bell';
    }

    formatTimestamp(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (minutes < 60) {
            return minutes <= 1 ? 'há 1 minuto' : `há ${minutes} minutos`;
        } else if (hours < 24) {
            return hours === 1 ? 'há 1 hora' : `há ${hours} horas`;
        } else if (days < 7) {
            return days === 1 ? 'há 1 dia' : `há ${days} dias`;
        } else {
            return timestamp.toLocaleDateString('pt-BR');
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    filterNotificationsByPeriod(notifications) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);

        switch (this.filters.period) {
            case 'today':
                return notifications.filter(n => n.timestamp >= today);
            case 'yesterday':
                return notifications.filter(n => n.timestamp >= yesterday && n.timestamp < today);
            case 'week':
                return notifications.filter(n => n.timestamp >= lastWeek);
            case 'custom':
                const startDate = new Date(document.getElementById('startDate').value);
                const endDate = new Date(document.getElementById('endDate').value);
                return notifications.filter(n => n.timestamp >= startDate && n.timestamp <= endDate);
            default:
                return notifications;
        }
    }

    filterNotifications() {
        let filtered = this.notifications.filter(notification => 
            this.filters.types.includes(notification.type) &&
            this.filters.priorities.includes(notification.priority) &&
            this.filters.status.includes(notification.status)
        );

        return this.filterNotificationsByPeriod(filtered);
    }

    groupNotificationsByDate(notifications) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);

        return {
            today: notifications.filter(n => n.timestamp >= today),
            yesterday: notifications.filter(n => n.timestamp >= yesterday && n.timestamp < today),
            week: notifications.filter(n => n.timestamp >= lastWeek && n.timestamp < yesterday)
        };
    }

    renderNotifications(notifications = null) {
        const filtered = notifications || this.filterNotifications();
        const grouped = this.groupNotificationsByDate(filtered);

        // Limpar containers
        this.todayContainer.innerHTML = '';
        this.yesterdayContainer.innerHTML = '';
        this.weekContainer.innerHTML = '';

        // Renderizar notificações agrupadas
        grouped.today.forEach(notification => {
            this.todayContainer.appendChild(this.getNotificationElement(notification));
        });

        grouped.yesterday.forEach(notification => {
            this.yesterdayContainer.appendChild(this.getNotificationElement(notification));
        });

        grouped.week.forEach(notification => {
            this.weekContainer.appendChild(this.getNotificationElement(notification));
        });

        // Atualizar contadores e visibilidade das seções
        const sections = [
            { container: this.todayContainer.parentElement, count: grouped.today.length },
            { container: this.yesterdayContainer.parentElement, count: grouped.yesterday.length },
            { container: this.weekContainer.parentElement, count: grouped.week.length }
        ];

        sections.forEach(({ container, count }) => {
            const counter = container.querySelector('.notification-count');
            if (counter) counter.textContent = count;
            container.style.display = count > 0 ? 'block' : 'none';
        });
    }

    render() {
        this.renderNotifications();
    }
}

// Inicializar o sistema de notificações
document.addEventListener('DOMContentLoaded', () => {
    const notificationSystem = new NotificationSystem();
});