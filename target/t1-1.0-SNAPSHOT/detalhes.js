// DOM Elements
const mainImage = document.getElementById('main-image');
const thumbnails = document.querySelectorAll('.thumbnail');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.close-btn');

// Modal buttons
const mapBtn = document.getElementById('map-btn');
const scheduleBtn = document.getElementById('schedule-btn');
const contractBtn = document.getElementById('contract-btn');

// Forms
const scheduleForm = document.getElementById('scheduleForm');
const contractForm = document.getElementById('contractForm');

// Gallery functionality
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        // Update main image
        mainImage.src = thumbnail.src;
        
        // Update active thumbnail
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnail.classList.add('active');
    });
});

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for modal buttons
mapBtn.addEventListener('click', () => openModal('mapModal'));
scheduleBtn.addEventListener('click', () => openModal('scheduleModal'));
contractBtn.addEventListener('click', () => openModal('contractModal'));

// Close modal with close button
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        closeModal(modal.id);
    });
});

// Close modal when clicking outside
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal.id);
        }
    });
});

// Form submissions
scheduleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(scheduleForm);
    const data = Object.fromEntries(formData.entries());
    
    // Here you would typically send the data to your backend
    console.log('Schedule visit data:', data);
    
    // Show success message
    alert('Visita agendada com sucesso!');
    closeModal('scheduleModal');
    scheduleForm.reset();
});

contractForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(contractForm);
    const data = Object.fromEntries(formData.entries());
    
    // Here you would typically send the data to your backend
    console.log('Contract request data:', data);
    
    // Show success message
    alert('Solicitação de contrato enviada com sucesso!');
    closeModal('contractModal');
    contractForm.reset();
});

// Form input validation
document.querySelectorAll('input[required], select[required]').forEach(input => {
    input.addEventListener('invalid', (e) => {
        e.preventDefault();
        input.classList.add('error');
    });
    
    input.addEventListener('input', () => {
        input.classList.remove('error');
    });
});

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            if (modal.classList.contains('active')) {
                closeModal(modal.id);
            }
        });
    }
});

// Initialize current date as minimum date for scheduling
const today = new Date().toISOString().split('T')[0];
if (document.getElementById('scheduleDate')) {
    document.getElementById('scheduleDate').min = today;
}
if (document.getElementById('startDate')) {
    document.getElementById('startDate').min = today;
}