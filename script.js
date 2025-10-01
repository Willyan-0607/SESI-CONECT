document.addEventListener('DOMContentLoaded', () => {
    // Pega os elementos do DOM
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeBtn = document.querySelector('.close-btn');

    // Função para abrir o modal
    const openModal = () => {
        loginModal.style.display = 'flex';
    };

    // Função para fechar o modal
    const closeModal = () => {
        loginModal.style.display = 'none';
    };

    // Adiciona evento de clique ao botão de login
    loginBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Impede que o link '#' mude a URL
        openModal();
    });

    // Adiciona evento de clique ao botão de fechar (X)
    closeBtn.addEventListener('click', closeModal);

    // Fecha o modal se o usuário clicar fora do conteúdo
    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            closeModal();
        }
    });

    // Opcional: Impede o envio do formulário (para este exemplo)
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Login enviado com sucesso! (Funcionalidade de exemplo)');
        closeModal();
    });
});