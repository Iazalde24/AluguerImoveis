// Estado da aplicação
let tasks = [];
let currentFilter = 'all';
let currentView = 'list';
let isEditing = false;
let editingTaskId = null;

// Elementos DOM
const taskList = document.getElementById('taskList');
const taskModal = document.getElementById('taskModal');
const taskForm = document.getElementById('taskForm');
const addTaskBtn = document.getElementById('addTaskBtn');
const searchTask = document.getElementById('searchTask');
const sortTasks = document.getElementById('sortTasks');
const themeToggle = document.getElementById('themeToggle');

// Funções auxiliares
function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR');
}

function getDaysRemaining(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Gerenciamento de tarefas
function createTask(taskData) {
    const task = {
        id: Date.now(),
        title: taskData.title,
        description: taskData.description,
        dueDate: taskData.dueDate,
        priority: task
    };
    }