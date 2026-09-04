
        document.addEventListener('DOMContentLoaded', () => {
    // Menu telemóvel toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Carrossel de trabalhos (scroll horizontal)
    const carousel = document.querySelector('.portfolio-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -300, behavior: 'smooth' });
    });

    // Voltar ao topo
    const backToTopBtn = document.getElementById('backToTop');
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Animação de entrada suave ao scroll (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Selecionar elementos para animar
    document.querySelectorAll('.service-card, .step, .portfolio-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll(".portfolio-item video");

    if (videos.length === 0) return;

    // Função para reiniciar e tocar todos os vídeos juntos
    function playAllVideosTogether() {
        videos.forEach(video => {
            video.currentTime = 0; // Volta para o início (0s)
            
            // Promessa para evitar erros de bloqueio de autoplay do navegador
            let playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Autoplay bloqueado até interação do utilizador:", error);
                });
            }
        });
    }

    // Aguarda todos os vídeos carregarem os metadados para sincronizar
    let loadedCount = 0;
    videos.forEach(video => {
        // Garante que o vídeo está mudo para permitir o autoplay simultâneo
        video.muted = true;

        if (video.readyState >= 1) {
            loadedCount++;
            if (loadedCount === videos.length) playAllVideosTogether();
        } else {
            video.addEventListener("loadedmetadata", () => {
                loadedCount++;
                if (loadedCount === videos.length) playAllVideosTogether();
            });
        }
    });

    // Garantia de segurança: se algum vídeo demorar a carregar, força a sincronização após 1 segundo
    setTimeout(playAllVideosTogether, 1000);
});
});
