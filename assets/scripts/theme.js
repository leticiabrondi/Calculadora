const toggleTema = document.getElementById('toggle-tema');
const body = document.body;

// Alterna entre modo claro e escuro
toggleTema.addEventListener('click', () => {
    body.classList.toggle('dark');
});
