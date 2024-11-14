document.addEventListener('DOMContentLoaded', () => {
    
    feather.replace();

    const sidebarLinks = document.querySelectorAll('.sidebar a');
    const sections = document.querySelectorAll('section');
    const logoutBtn = document.getElementById('logoutBtn');
    const addImovelForm = document.getElementById('add-imovel-form');
    const perfilForm = document.getElementById('perfil-form');

  

    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active-section');
            section.classList.add('hidden-section');
        });
        document.getElementById(sectionId).classList.remove('hidden-section');
        document.getElementById(sectionId).classList.add('active-section');
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            showSection(link.getAttribute('data-section'));
        });
    });

    function renderImoveis() {
        const tableBody = document.querySelector('#imoveis-table tbody');
        tableBody.innerHTML = '';
        imoveis.forEach(imovel => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${imovel.titulo}</td>
                <td>${imovel.tipo}</td>
                <td>${imovel.localizacao}</td>
                <td>MZN ${imovel.preco.toLocaleString()}</td>
                <td>${imovel.status}</td>
                <td>
                    <button class="btn btn-action" onclick="editarImovel(${imovel.id})">Editar</button>
                    <button class="btn btn-action btn-danger" onclick="removerImovel(${imovel.id})">Remover</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

     function addImovelToImoveisJS(imovel) {
        const newImovel = new Imovel(
            imovel.titulo,
            imovel.tipo,
            imovel.localizacao,
            imovel.preco.toLocaleString(), 
            'Disponível', 
            'Venda',      
            '843567890',  
            imovel.imgUrl    
        );

        const destaquesContainer = document.getElementById('imoveis-destaques-container');
        const destaquesContainer1 = document.getElementById('imoveis-container');
        destaquesContainer.appendChild(newImovel.render());
        destaquesContainer1.appendChild(newImovel.render());
    }

    addImovelForm.addEventListener('submit', (e) => {
        e.preventDefault();
          // Captura os dados do formulário
          const titulo = document.getElementById('titulo').value;
          const tipo = document.getElementById('tipo').value;
          const localizacao = document.getElementById('localizacao').value;
          const preco = parseFloat(document.getElementById('preco').value);
          const descricao = document.getElementById('descricao').value;
  
          // Captura o arquivo de imagem e gera uma URL temporária
          const imgFile = document.getElementById('imgUrl').files[0];
          const imgUrl = URL.createObjectURL(imgFile);
          const novoImovel = {
            id: imoveis.length + 1,
            titulo: titulo,
            tipo: tipo,
            localizacao: localizacao,
            preco: preco,
            descricao: descricao,
            status: 'Disponível',
            imgUrl: imgUrl // URL da imagem temporária
        };

        imoveis.push(novoImovel);
        renderImoveis();
        addImovelForm.reset();
        alert('Imóvel adicionado com sucesso!');

        // Adiciona o imóvel também à lista de "Todos Imóveis"
        addImovelToImoveisJS(novoImovel);
    });
    function editarImovel(id) {
        alert(`Editar imóvel com ID: ${id}`);
    }

    function removerImovel(id) {
        if (confirm('Tem certeza que deseja remover este imóvel?')) {
            imoveis = imoveis.filter(imovel => imovel.id !== id);
            renderImoveis();
        }
    }

    window.editarImovel = editarImovel;
    window.removerImovel = removerImovel;

    function renderMensagens() {
        const mensagensList = document.getElementById('mensagens-list');
        mensagensList.innerHTML = '';
        mensagens.forEach(mensagem => {
            const mensagemDiv = document.createElement('div');
            mensagemDiv.className = 'mensagem';
            mensagemDiv.innerHTML = `
                <h3>${mensagem.remetente} <small>${mensagem.email}</small></h3>
                <p>${mensagem.mensagem}</p>
                <button class="btn btn-action" onclick="responderMensagem(${mensagem.id})">Responder</button>
            `;
            mensagensList.appendChild(mensagemDiv);
        });
    }

    addImovelForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const novoImovel = {
            id: imoveis.length + 1,
            titulo: document.getElementById('titulo').value,
            tipo: document.getElementById('tipo').value,
            localizacao: document.getElementById('localizacao').value,
            preco: parseFloat(document.getElementById('preco').value),
            status: 'Disponível'
        };
        imoveis.push(novoImovel);
        renderImoveis();
        addImovelForm.reset();
        alert('Imóvel adicionado com sucesso!');
    });

    perfilForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Aqui você enviaria os dados do perfil para o servidor
        alert('Perfil atualizado com sucesso!');
    });

    logoutBtn.addEventListener('click', () => {
        // Aqui você implementaria a lógica de logout
        alert('Logout realizado com sucesso!');
        window.location.href = 'index.html';
    });

    // Funções globais (para serem acessíveis pelos botões inline)
    window.editarImovel = (id) => {
        // Implementar lógica de edição
        alert(`Editar imóvel com ID: ${id}`);
    };

    window.removerImovel = (id) => {
        if (confirm('Tem certeza que deseja remover este imóvel?')) {
            imoveis = imoveis.filter(imovel => imovel.id !== id);
            renderImoveis();
        }
    };

    window.responderMensagem = (id) => {
        // Implementar lógica de resposta
        alert(`Responder à mensagem com ID: ${id}`);
    };

    // Inicialização
    renderImoveis();
    renderMensagens();
});