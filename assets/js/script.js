document.addEventListener('DOMContentLoaded', () => {
    
    // ==================================================
    // 1. MENU MOBILE (Lógica Mantida e Otimizada)
    // ==================================================
    const btnMobile = document.querySelector('.menu-mobile-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const iconBtn = btnMobile.querySelector('i');

    function toggleMenu() {
        const isAcitve = navMenu.classList.toggle('ativo');
        
        // Troca ícone: Se ativo vira 'X', senão vira 'Barras'
        if (isAcitve) {
            iconBtn.classList.replace('fa-bars', 'fa-times');
            document.body.style.overflow = 'hidden'; // Trava o scroll do fundo
        } else {
            iconBtn.classList.replace('fa-times', 'fa-bars');
            document.body.style.overflow = 'auto'; // Destrava o scroll
        }
    }

    btnMobile.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em qualquer link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('ativo')) toggleMenu();
        });
    });


    // ==================================================
    // 2. HEADER "STICKY" (Efeito de vidro ao rolar)
    // ==================================================
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        // Se rolar mais que 50px, adiciona classe 'scrolled'
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // ==================================================
    // 3. SCROLL REVEAL (Animação de entrada dos elementos)
    // ==================================================
    // Seleciona o que queremos animar: titulos, cards, imagens e textos
    const elementsToReveal = document.querySelectorAll('.card, .sobre-texto, .sobre-imagem, .hero-content, .contato-wrapper h3, .contato-wrapper');

    // Configura o "Observador"
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se o elemento entrou na tela
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                // Opcional: Parar de observar depois que apareceu a primeira vez
                revealObserver.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Ativa quando 15% do elemento estiver visível
    });

    // Adiciona a classe base oculta e começa a observar
    elementsToReveal.forEach(el => {
        el.classList.add('reveal-hidden');
        revealObserver.observe(el);
    });


    // ==================================================
    // 4. ACTIVE LINK (Menu brilha conforme a seção)
    // ==================================================
    const sections = document.querySelectorAll('section');

    const activeLinkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove 'active' de todos os links
                navLinks.forEach(link => link.classList.remove('active-link'));
                
                // Pega o ID da seção atual (ex: 'sobre')
                const id = entry.target.getAttribute('id');
                
                // Acha o link que aponta para esse ID e adiciona a classe
                const activeLink = document.querySelector(`.nav-menu a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active-link');
                }
            }
        });
    }, { threshold: 0.5 }); // Ativa quando 50% da seção está visível

    sections.forEach(sec => activeLinkObserver.observe(sec));


    // ==================================================
    // 5. BOTÃO VOLTAR AO TOPO (Suavizado)
    // ==================================================
    const btnTopo = document.getElementById('btn-topo');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btnTopo.classList.add('mostrar');
        } else {
            btnTopo.classList.remove('mostrar');
        }
    });

    btnTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});