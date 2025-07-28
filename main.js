<// ==================== SISTEMA SPA MEJORADO ====================

class PortfolioSPA {
    constructor() {
        this.currentSection = 'information';
        this.sections = {
            information: {
                title: 'Sobre Mí',
                content: this.getInformationContent()
            },
            proyectos: {
                title: 'Mis Proyectos', 
                content: this.getProyectosContent()
            },
            contact: {
                title: 'Contacto',
                content: this.getContactContent()
            },
            skills: {
                title: 'Habilidades',
                content: this.getSkillsContent()
            }
        };
        this.init();
    }

    init() {
        this.createContentContainer();
        this.setupNavigation();
        this.setupBrowserHistory();
        this.loadInitialSection();
    }

    createContentContainer() {
        const mainContent = document.querySelector('.main-content');
        if (!document.querySelector('.spa-content')) {
            const contentDiv = document.createElement('div');
            contentDiv.className = 'spa-content';
            mainContent.appendChild(contentDiv);
        }
    }

    setupNavigation() {
        const menuItems = document.querySelectorAll('.spa-menu a');
        
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Obtener la sección del href (#/information -> information)
                const sectionId = item.getAttribute('href').substring(2);
                this.navigateToSection(sectionId);
            });
        });
    }

    setupBrowserHistory() {
        window.addEventListener('popstate', () => {
            const sectionId = this.getSectionFromURL();
            this.loadSection(sectionId, false); // false = no actualizar historia
        });
    }

    navigateToSection(sectionId) {
        if (this.sections[sectionId]) {
            this.loadSection(sectionId, true);
        }
    }

    loadSection(sectionId, updateHistory = true) {
        if (!this.sections[sectionId]) {
            console.error(`Sección '${sectionId}' no encontrada`);
            return;
        }

        // Actualizar estado activo en navegación
        this.updateActiveNavigation(sectionId);

        // Cargar contenido con animación
        this.loadSectionContent(sectionId);

        // Actualizar URL si es necesario
        if (updateHistory) {
            history.pushState({ section: sectionId }, '', `#/${sectionId}`);
        }

        this.currentSection = sectionId;
    }

    updateActiveNavigation(sectionId) {
        const menuItems = document.querySelectorAll('.spa-menu a');
        
        menuItems.forEach(item => {
            item.classList.remove('active');
            const itemSection = item.getAttribute('href').substring(2);
            if (itemSection === sectionId) {
                item.classList.add('active');
            }
        });
    }

    loadSectionContent(sectionId) {
        const container = document.querySelector('.spa-content');
        const section = this.sections[sectionId];

        // Efecto de fade out
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';

        setTimeout(() => {
            container.innerHTML = section.content;
            
            // Efecto de fade in
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
            
            // Reinicializar efectos específicos de la sección
            this.initializeSectionEffects(sectionId);
        }, 200);
    }

    initializeSectionEffects(sectionId) {
        switch(sectionId) {
            case 'information':
                this.initTypingEffect();
                break;
            case 'proyectos': 
                this.initProjectFilters();
                break;
            case 'contact':
                this.initContactForm();
                break;
        }
    }

    initTypingEffect() {
        const typingElements = document.querySelectorAll('.typing-effect');
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, 20);
        });
    }

    initProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectItems = document.querySelectorAll('.inventory-slot');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    initContactForm() {
        const form = document.querySelector('.contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Aquí puedes agregar la lógica de envío del formulario
                alert('¡Mensaje enviado! (Demo)');
            });
        }
    }

    getSectionFromURL() {
        const hash = window.location.hash.substring(2);
        return hash || 'information';
    }

    loadInitialSection() {
        const sectionId = this.getSectionFromURL();
        this.loadSection(sectionId, false);
    }

    // ==================== CONTENIDO DE SECCIONES ====================

    getInformationContent() {
        return `
            <section id="information" class="section pixel-border terminal-effect">
                <div class="terminal-header">
                    <div class="terminal-buttons">
                        <span class="terminal-btn red"></span>
                        <span class="terminal-btn yellow"></span>
                        <span class="terminal-btn green"></span>
                    </div>
                    <span class="terminal-title">about_miguel.exe</span>
                </div>
                <div class="terminal-content">
                    <h2><i class="fas fa-user"></i> Hola, Soy <span class="highlight">Miguel</span></h2>
                    <p class="text-info typing-effect">
                        Soy Miguel Ángel Lopera Muñoz, desarrollador web de Medellín, Colombia, con 20 años de edad y una gran pasión por el aprendizaje constante. Especializado en tecnologías como Python, HTML y CSS, me enfoco en construir soluciones funcionales, limpias y eficientes.
                        <br><br>
                        Me destaco por mi capacidad para liderar proyectos, coordinar equipos y mantener una visión clara desde la planificación hasta la entrega final.
                        <br><br>
                        Actualmente resido en el sur de Medellín, donde combino mi entusiasmo por el desarrollo de software con una mentalidad proactiva y enfocada en resultados.
                        <br><br>
                        Busco seguir creciendo profesionalmente en el mundo de la tecnología, aportando soluciones innovadoras y colaborando en proyectos que generen impacto real.
                    </p>
                </div>
            </section>
        `;
    }

    getProyectosContent() {
        return `
            <section id="proyectos" class="section pixel-border">
                <div class="section-header">
                    <h2><i class="fas fa-gamepad"></i> Mis Proyectos</h2>
                    <div class="filter-buttons">
                        <button class="filter-btn active" data-filter="all">Todos</button>
                        <button class="filter-btn" data-filter="web">Web</button>
                        <button class="filter-btn" data-filter="game">Juegos</button>
                    </div>
                </div>
                
                <div class="contenedor inventory-grid">
                    <a class="item inventory-slot" href="https://rwimike.github.io/Login-signup/" data-category="web" target="_blank">
                        <div class="screen">
                            <img src="log.png" alt="Login Project" class="project-img">
                        </div>
                        <p>LogIn & SignUp</p>
                        <span class="item-tag web-tag">Web</span>
                    </a>
                    <a class="item inventory-slot" href="https://rwimike.github.io/Multipages/" data-category="web" target="_blank">
                        <div class="screen">
                            <img src="Blog.png" alt="Multipage Project" class="project-img">
                        </div>
                        <p>Multipagina</p>
                        <span class="item-tag web-tag">Web</span>
                    </a>
                    <a class="item inventory-slot" href="#" data-category="web">
                        <div class="screen">
                            <i class="fas fa-bars"></i>
                        </div>
                        <p>Menú</p>
                        <span class="item-tag web-tag">Web</span>
                    </a>
                    <a class="item inventory-slot" href="#" data-category="web">
                        <div class="screen">
                            <i class="fas fa-calendar-alt"></i>
                        </div>
                        <p>Eventos</p>
                        <span class="item-tag web-tag">Web</span>
                    </a>
                    <a class="item inventory-slot" href="#" data-category="web">
                        <div class="screen">
                            <i class="fas fa-store"></i>
                        </div>
                        <p>Tienda Online</p>
                        <span class="item-tag web-tag">Web</span>
                    </a>
                    <a class="item inventory-slot" href="#" data-category="game">
                        <div class="screen">
                            <i class="fas fa-chess"></i>
                        </div>
                        <p>Juego de Ajedrez</p>
                        <span class="item-tag game-tag">Juego</span>
                    </a>
                </div>
            </section>
        `;
    }

    getContactContent() {
        return `
            <section id="contacto" class="section pixel-border">
                <h2><i class="fas fa-envelope"></i> Contacto</h2>
                <form class="contact-form">
                    <div class="form-group">
                        <label for="name">Nombre:</label>
                        <input type="text" id="name" class="pixel-input" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" class="pixel-input" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Mensaje:</label>
                        <textarea id="message" class="pixel-input" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="pixel-btn send-btn">Enviar Mensaje</button>
                </form>
            </section>
        `;
    }

    getSkillsContent() {
        return `
            <section id="skills-detail" class="section pixel-border terminal-effect">
                <div class="terminal-header">
                    <div class="terminal-buttons">
                        <span class="terminal-btn red"></span>
                        <span class="terminal-btn yellow"></span>
                        <span class="terminal-btn green"></span>
                    </div>
                    <span class="terminal-title">skills_tree.exe</span>
                </div>
                <div class="terminal-content">
                    <h2><i class="fas fa-code"></i> Árbol de Habilidades</h2>
                    
                    <div class="skill-category">
                        <h3><i class="fas fa-laptop-code"></i> Frontend Development</h3>
                        <div class="skill-progress-container">
                            <div class="skill-progress-item">
                                <span class="skill-name">HTML5</span>
                                <div class="skill-bar">
                                    <div class="skill-progress" style="width: 95%">95%</div>
                                </div>
                            </div>
                            <div class="skill-progress-item">
                                <span class="skill-name">CSS3</span>
                                <div class="skill-bar">
                                    <div class="skill-progress" style="width: 90%">90%</div>
                                </div>
                            </div>
                            <div class="skill-progress-item">
                                <span class="skill-name">JavaScript</span>
                                <div class="skill-bar">
                                    <div class="skill-progress" style="width: 85%">85%</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="skill-category">
                        <h3><i class="fas fa-server"></i> Backend Development</h3>
                        <div class="skill-progress-container">
                            <div class="skill-progress-item">
                                <span class="skill-name">Python</span>
                                <div class="skill-bar">
                                    <div class="skill-progress" style="width: 80%">80%</div>
                                </div>
                            </div>
                            <div class="skill-progress-item">
                                <span class="skill-name">PHP</span>
                                <div class="skill-bar">
                                    <div class="skill-progress" style="width: 70%">70%</div>
                                </div>
                            </div>
                            <div class="skill-progress-item">
                                <span class="skill-name">Node.js</span>
                                <div class="skill-bar">
                                    <div class="skill-progress" style="width: 75%">75%</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="skill-category">
                        <h3><i class="fas fa-tools"></i> Herramientas & Otros</h3>
                        <div class="skill-progress-container">
                            <div class="skill-progress-item">
                                <span class="skill-name">Git & GitHub</span>
                                <div class="skill-bar">
                                    <div class="skill-progress" style="width: 88%">88%</div>
                                </div>
                            </div>
                            <div class="skill-progress-item">
                                <span class="skill-name">Responsive Design</span>
                                <div class="skill-bar">
                                    <div class="skill-progress" style="width: 92%">92%</div>
                                </div>
                            </div>
                            <div class="skill-progress-item">
                                <span class="skill-name">Tailwind CSS</span>
                                <div class="skill-bar">
                                    <div class="skill-progress" style="width: 85%">85%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

// Configuración de partículas para el fondo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar SPA
    const portfolioSPA = new PortfolioSPA();

    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#00ff00" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#00ff00", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
    
    // Cursor personalizado mejorado
    const cursorInner = document.querySelector('.cursor-inner');
    const cursorOuter = document.querySelector('.cursor-outer');
    
    if (cursorInner && cursorOuter) {
        document.addEventListener('mousemove', (e) => {
            cursorInner.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
            cursorOuter.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
        });
        
        // Efectos de hover
        const interactiveElements = document.querySelectorAll('a, button, .item, .pixel-btn, .pixel-social, input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorInner.classList.add('cursor-hover');
                cursorOuter.classList.add('cursor-hover-outer');
            });
            
            el.addEventListener('mouseleave', () => {
                cursorInner.classList.remove('cursor-hover');
                cursorOuter.classList.remove('cursor-hover-outer');
            });
        });
    }
    
    // Botón de volver arriba
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Actualizar año del footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});
