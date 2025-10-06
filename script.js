
const senhaGeradaEl = document.getElementById('senhaGerada');
const comprimentoEl = document.getElementById('comprimento');
const valorComprimentoEl = document.getElementById('valorComprimento');
const maiusculasEl = document.getElementById('maiusculas');
const minusculasEl = document.getElementById('minusculas');
const numerosEl = document.getElementById('numeros');
const simbolosEl = document.getElementById('simbolos');
const gerarSenhaBtn = document.getElementById('gerarSenha');
const copiarBtn = document.getElementById('copiarBtn');

const caracteresMaiusculos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const caracteresMinusculos = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

function gerarSenha() {
    let senha = '';
    let caracteresPermitidos = '';
    const comprimento = comprimentoEl.value;

    if (maiusculasEl.checked) {
        caracteresPermitidos += caracteresMaiusculos;
    }
    if (minusculasEl.checked) {
        caracteresPermitidos += caracteresMinusculos;
    }
    if (numerosEl.checked) {
        caracteresPermitidos += numeros;
    }
    if (simbolosEl.checked) {
        caracteresPermitidos += simbolos;
    }

    if (caracteresPermitidos.length === 0) {
        senhaGeradaEl.value = 'Selecione uma opção!';
        return;
    }

    for (let i = 0; i < comprimento; i++) {
        const randomIndex = Math.floor(Math.random() * caracteresPermitidos.length);
        senha += caracteresPermitidos[randomIndex];
    }

    senhaGeradaEl.value = senha;
}

comprimentoEl.addEventListener('input', () => {
    valorComprimentoEl.textContent = comprimentoEl.value;
});

gerarSenhaBtn.addEventListener('click', gerarSenha);

copiarBtn.addEventListener('click', () => {

    senhaGeradaEl.select();
    senhaGeradaEl.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(senhaGeradaEl.value)
        .then(() => {

            copiarBtn.textContent = 'Copiado!';
            setTimeout(() => {
                copiarBtn.textContent = 'Copiar';
            }, 2000);
        })
        .catch(err => {
            console.error('Erro ao copiar a senha: ', err);
        });
});

gerarSenha();

const themeToggle = document.getElementById('checkbox');

function toggleDarkMode(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

themeToggle.addEventListener('change', (event) => {
    toggleDarkMode(event.target.checked);
});

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');

    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark') {
        themeToggle.checked = true;
        toggleDarkMode(true);
    } else if (savedTheme === 'light') {
        themeToggle.checked = false;
        toggleDarkMode(false);
    } else if (systemPrefersDark) {

        themeToggle.checked = true;
        toggleDarkMode(true);
    }
}); 