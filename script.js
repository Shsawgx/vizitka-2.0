// Элементы модального окна
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');
const overlay = document.getElementById('modalOverlay');
const copyBtn = document.getElementById('copyBtn');
const emailValue = document.getElementById('emailValue').innerText;

// Открытие/Закрытие модалки
openBtn.onclick = () => overlay.style.display = 'flex';
closeBtn.onclick = () => overlay.style.display = 'none';
overlay.onclick = (e) => { if (e.target === overlay) overlay.style.display = 'none'; };

// Копирование почты
copyBtn.onclick = () => {
    navigator.clipboard.writeText(emailValue).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Ок!';
        copyBtn.style.background = '#4cd137';
        setTimeout(() => {
            copyBtn.innerText = originalText;
            copyBtn.style.background = '#00d2ff';
        }, 1500);
    });
};

// Анимированный фон
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

const init = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = Array.from({length: 60}, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() - 0.5,
        vy: Math.random() - 0.5
    }));
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 210, 255, 0.15)';
    particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2); ctx.fill();
    });
    requestAnimationFrame(animate);
};

window.onresize = init;
init(); animate();