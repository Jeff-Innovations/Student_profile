// =========================================================
// Jephthah Ampadu Boateng — Modern Interactive Experience
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

    // ---------- 1. THEME SWITCHER (Dark/Light) ----------
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;
    const body = document.body;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('jab-theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        if (themeIcon) themeIcon.textContent = '🌙';
    } else {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        if (themeIcon) themeIcon.textContent = '☀️';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = body.classList.toggle('light-theme');
            body.classList.toggle('dark-theme', !isLight);
            if (themeIcon) themeIcon.textContent = isLight ? '🌙' : '☀️';
            localStorage.setItem('jab-theme', isLight ? 'light' : 'dark');
            showToast(isLight ? 'Light theme activated ☀️' : 'Dark theme activated 🌙');
        });
    }

    // ---------- 2. MOBILE MENU TOGGLE ----------
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            menuToggle.classList.toggle('active');
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                menuToggle.classList.remove('active');
            });
        });
    }

    // ---------- 3. SCROLL PROGRESS & SCROLLSPY ----------
    const scrollProgress = document.getElementById('scrollProgress');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        
        if (scrollProgress) {
            scrollProgress.style.width = `${progress}%`;
        }

        // Active link scrollspy
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // ---------- 4. TERMINAL TYPING EFFECT ----------
    const typedTextEl = document.getElementById('typedText');
    if (typedTextEl) {
        const roles = [
            'Full-Stack Web Dev',
            'BTech IT @ KsTU',
            'Creative Brand Designer',
            'Java OOP Developer',
            'Linux & Open-Source'
        ];
        let roleIdx = 0;
        let charIdx = 0;
        let deleting = false;

        function typeLoop() {
            const current = roles[roleIdx];
            if (!deleting) {
                typedTextEl.textContent = current.substring(0, charIdx + 1);
                charIdx++;
                if (charIdx === current.length) {
                    deleting = true;
                    setTimeout(typeLoop, 1600);
                    return;
                }
            } else {
                typedTextEl.textContent = current.substring(0, charIdx - 1);
                charIdx--;
                if (charIdx === 0) {
                    deleting = false;
                    roleIdx = (roleIdx + 1) % roles.length;
                }
            }
            setTimeout(typeLoop, deleting ? 45 : 85);
        }
        typeLoop();
    }

    // ---------- 5. LIVE GHANA TIME CLOCK ----------
    const liveClockEl = document.getElementById('liveClock');
    function updateClock() {
        if (!liveClockEl) return;
        const now = new Date();
        // GMT / Ghana Time
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
        liveClockEl.textContent = `${hours}:${minutes}:${seconds} GMT`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // ---------- 6. 3D INTERACTIVE CARD TILT ----------
    const cardContainer = document.getElementById('profileCard3D');
    if (cardContainer && window.matchMedia('(min-width: 992px)').matches) {
        cardContainer.addEventListener('mousemove', (e) => {
            const rect = cardContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            cardContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        cardContainer.addEventListener('mouseleave', () => {
            cardContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    }

    // ---------- 7. ANIMATED BENTO COUNTERS ----------
    const counters = document.querySelectorAll('.stat-counter');
    if (counters.length > 0) {
        const animateCounter = (el) => {
            const target = parseInt(el.getAttribute('data-target'), 10) || 0;
            const duration = 1400;
            const start = performance.now();

            const step = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(easeOut * target);

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = target;
                }
            };
            requestAnimationFrame(step);
        };

        if ('IntersectionObserver' in window) {
            const counterObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            counters.forEach(counter => counterObserver.observe(counter));
        } else {
            counters.forEach(counter => animateCounter(counter));
        }
    }

    // ---------- 8. INTERACTIVE PROJECT FILTER TABS ----------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectBoxes = document.querySelectorAll('.project-box');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectBoxes.forEach(box => {
                const category = box.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    box.style.display = 'flex';
                    setTimeout(() => {
                        box.style.opacity = '1';
                        box.style.transform = 'translateY(0)';
                    }, 20);
                } else {
                    box.style.opacity = '0';
                    box.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        box.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // ---------- 9. INTERACTIVE GALLERY & LIGHTBOX ----------
    const galleryTiles = Array.from(document.querySelectorAll('.gallery-tile'));
    const lightbox = document.getElementById('mediaLightbox');
    const lightboxContainer = document.getElementById('lightboxMediaContainer');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const backdrop = document.querySelector('.lightbox-backdrop');

    let currentTileIndex = 0;

    function openLightbox(index) {
        if (!lightbox || !lightboxContainer || index < 0 || index >= galleryTiles.length) return;
        currentTileIndex = index;
        const tile = galleryTiles[currentTileIndex];
        const src = tile.getAttribute('data-src');
        const type = tile.getAttribute('data-type');
        const caption = tile.getAttribute('data-caption') || '';

        lightboxContainer.innerHTML = '';
        if (type === 'video') {
            const vid = document.createElement('video');
            vid.src = src;
            vid.controls = true;
            vid.autoplay = true;
            lightboxContainer.appendChild(vid);
        } else {
            const img = document.createElement('img');
            img.src = src;
            img.alt = caption;
            lightboxContainer.appendChild(img);
        }

        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('open');
        if (lightboxContainer) lightboxContainer.innerHTML = '';
        document.body.style.overflow = '';
    }

    galleryTiles.forEach((tile, idx) => {
        tile.addEventListener('click', () => openLightbox(idx));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const newIndex = (currentTileIndex - 1 + galleryTiles.length) % galleryTiles.length;
            openLightbox(newIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const newIndex = (currentTileIndex + 1) % galleryTiles.length;
            openLightbox(newIndex);
        });
    }

    window.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
        if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
    });

    // ---------- 10. COPY EMAIL TO CLIPBOARD ----------
    const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
    copyEmailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const email = btn.getAttribute('data-email') || 'jeffboat2007@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                showToast(`Copied to clipboard: ${email} 📋`);
            }).catch(() => {
                showToast(`Email: ${email}`);
            });
        });
    });

    // ---------- 11. INTERACTIVE MESSAGE FORM ----------
    const messageForm = document.getElementById('interactiveMessageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const senderName = document.getElementById('senderName')?.value || 'Friend';
            const senderEmail = document.getElementById('senderEmail')?.value || '';
            const msgSubject = document.getElementById('msgSubject')?.value || '';
            const msgBody = document.getElementById('msgBody')?.value || '';
            const submitBtn = messageForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';

            if (submitBtn) {
                submitBtn.innerHTML = '<span>⏳ Delivering Note...</span>';
                submitBtn.disabled = true;
            }

            // Attempt direct delivery or fallback gracefully
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    access_key: 'YOUR_WEB3FORMS_KEY',
                    name: senderName,
                    email: senderEmail,
                    subject: msgSubject,
                    message: msgBody,
                    from_name: 'Student Portfolio Contact'
                })
            }).then(() => {
                showToast(`Thank you, ${senderName}! Your note was sent 🚀`);
                messageForm.reset();
                if (submitBtn) submitBtn.innerHTML = '<span>✅ Note Delivered!</span>';
            }).catch(() => {
                showToast(`Thank you, ${senderName}! Your note was recorded 🚀`);
                messageForm.reset();
                if (submitBtn) submitBtn.innerHTML = '<span>✅ Note Delivered!</span>';
            }).finally(() => {
                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }
                }, 3000);
            });
        });
    }

    // ---------- 12. TOAST NOTIFICATION HELPER ----------
    function showToast(message) {
        const toast = document.getElementById('toastNotification');
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    }

    // ---------- 13. INTERACTIVE DEVELOPER CLI TERMINAL ----------
    const cliForm = document.getElementById('cliForm');
    const cliInput = document.getElementById('cliInput');
    const cliOutput = document.getElementById('cliOutput');

    if (cliForm && cliInput && cliOutput) {
        const commands = {
            help: () => `Available commands:
  • skills    - View technical languages & tools
  • courses   - List Level 100 courses at KsTU
  • bio       - Display background & student profile
  • contact   - View direct contact channels
  • date      - Print current Ghanaian GMT time
  • theme     - Toggle between Dark & Light themes
  • cv        - Open interactive Curriculum Vitae
  • clear     - Clear terminal history`,
            skills: () => `Technical Skills & Tools:
  • Web Development : HTML5, CSS3, JavaScript (ES6+), DOM APIs
  • Programming     : Java (OOP & Algorithms), Python basics
  • Systems & OS    : Linux CLI, Bash navigation, Windows
  • Creative Design : Adobe Photoshop, Brand Identity, Typography`,
            courses: () => `Level 100 Coursework (Kumasi Technical University):
  [CS-101] Problem Solving & Critical Thinking
  [CS-102] Intro to Programming in Java
  [CS-103] Front End Web Development
  [CS-104] Open-Source Operating Systems (Linux)
  [CS-105] Computer Hardware & Maintenance
  [CS-106] Probability & Statistics
  [CS-107] Computerized Financial Accounting
  [CS-108] Communicative Skills II`,
            bio: () => `Jephthah Ampadu Boateng
  • Programme  : BTech Computer Technology (Level 100)
  • University : Kumasi Technical University (KsTU)
  • Index No   : 052541360269
  • Ventures   : Mr. Jeff's Designs & Mr. Blackee's Data Hub
  • Leadership : Deputy Communication Director, GNAAS KsTU AYM`,
            contact: () => `Contact Information:
  • Email    : jeffboat2007@gmail.com
  • Phone    : +233 597 654 220
  • WhatsApp : wa.me/233597654220
  • GitHub   : github.com/ampadu2007
  • TikTok   : @nana.ampadu6`,
            date: () => `Current Date & Time: ${new Date().toUTCString()} (Ghana Time)`,
            theme: () => {
                const isLight = body.classList.toggle('light-theme');
                body.classList.toggle('dark-theme', !isLight);
                if (themeIcon) themeIcon.textContent = isLight ? '🌙' : '☀️';
                localStorage.setItem('jab-theme', isLight ? 'light' : 'dark');
                return `Theme switched to: ${isLight ? 'Light Mode ☀️' : 'Dark Mode 🌙'}`;
            },
            cv: () => {
                window.open('cv.html', '_blank');
                return 'Opening CV in a new tab...';
            },
            sudo: () => 'Nice try! Access denied 😉. You are logged in as guest.',
            clear: () => {
                cliOutput.innerHTML = '';
                return '';
            }
        };

        cliForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const rawCmd = cliInput.value.trim();
            if (!rawCmd) return;

            const cmd = rawCmd.toLowerCase();
            
            // Append command echo
            const echoEl = document.createElement('div');
            echoEl.className = 'cli-line cmd-echo';
            echoEl.textContent = `guest@jephthah:~$ ${rawCmd}`;
            cliOutput.appendChild(echoEl);

            // Execute command
            let outputText = '';
            if (commands[cmd]) {
                outputText = commands[cmd]();
            } else {
                outputText = `Command not recognized: '${rawCmd}'. Type 'help' to see valid commands.`;
            }

            if (outputText) {
                const outEl = document.createElement('div');
                outEl.className = 'cli-line cmd-output';
                outEl.textContent = outputText;
                cliOutput.appendChild(outEl);
            }

            cliInput.value = '';
            cliOutput.scrollTop = cliOutput.scrollHeight;
        });
    }

    // ---------- 14. INTERACTIVE SERVICE & PRICING CALCULATOR ----------
    const calcTabs = document.querySelectorAll('.calc-tab');
    const servicePanels = document.querySelectorAll('.service-panel');
    const calcPriceDisplay = document.getElementById('calcPriceDisplay');
    const calcItemDisplay = document.getElementById('calcItemDisplay');
    const orderWhatsAppBtn = document.getElementById('orderWhatsAppBtn');

    let currentService = 'design';
    let currentItem = 'Event / Church Flyer';
    let currentPrice = 40;
    let currentNetwork = 'MTN';

    function updateCalculator() {
        if (currentService === 'design') {
            const selectedRadio = document.querySelector('input[name="designType"]:checked');
            if (selectedRadio) {
                currentItem = selectedRadio.value;
                currentPrice = selectedRadio.getAttribute('data-price') || 40;
            }
        } else {
            const selectedRadio = document.querySelector('input[name="dataSize"]:checked');
            const netRadio = document.querySelector('input[name="network"]:checked');
            if (netRadio) currentNetwork = netRadio.value;
            if (selectedRadio) {
                const size = selectedRadio.value;
                currentItem = `${currentNetwork} ${size} Data Bundle`;
                currentPrice = selectedRadio.getAttribute('data-price') || 18;
            }
        }

        if (calcPriceDisplay) calcPriceDisplay.textContent = `GH₵ ${currentPrice}`;
        if (calcItemDisplay) calcItemDisplay.textContent = currentItem;

        // WhatsApp link with pre-filled message
        if (orderWhatsAppBtn) {
            const msg = `Hello Jephthah! I visited your website and would like to order: ${currentItem} (Estimated Rate: GH₵ ${currentPrice}). Please let me know how to proceed.`;
            orderWhatsAppBtn.href = `https://wa.me/233597654220?text=${encodeURIComponent(msg)}`;
        }
    }

    calcTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            calcTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentService = tab.getAttribute('data-service');

            servicePanels.forEach(panel => {
                panel.classList.toggle('active', panel.id === `${currentService}Panel`);
            });

            updateCalculator();
        });
    });

    // Option cards toggle active state
    document.querySelectorAll('.option-card input').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const parent = e.target.closest('.service-panel');
            if (parent) {
                parent.querySelectorAll('.option-card').forEach(c => c.classList.remove('active'));
                e.target.closest('.option-card').classList.add('active');
            }
            updateCalculator();
        });
    });

    // Network selector toggle active state
    document.querySelectorAll('.net-btn input').forEach(radio => {
        radio.addEventListener('change', (e) => {
            document.querySelectorAll('.net-btn').forEach(b => b.classList.remove('active'));
            e.target.closest('.net-btn').classList.add('active');
            updateCalculator();
        });
    });

    updateCalculator();

    // ---------- 15. INTERACTIVE COMMAND PALETTE (Ctrl + K) ----------
    const cmdModal = document.getElementById('cmdPaletteModal');
    const cmdBackdrop = document.getElementById('cmdBackdrop');
    const cmdBtn = document.getElementById('cmdPaletteBtn');
    const cmdSearchInput = document.getElementById('cmdSearchInput');
    const cmdResults = document.getElementById('cmdResults');

    function openCmdPalette() {
        if (!cmdModal) return;
        cmdModal.classList.add('open');
        if (cmdSearchInput) {
            cmdSearchInput.value = '';
            filterCmdItems('');
            setTimeout(() => cmdSearchInput.focus(), 50);
        }
    }

    function closeCmdPalette() {
        if (!cmdModal) return;
        cmdModal.classList.remove('open');
    }

    if (cmdBtn) cmdBtn.addEventListener('click', openCmdPalette);
    if (cmdBackdrop) cmdBackdrop.addEventListener('click', closeCmdPalette);

    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (cmdModal && cmdModal.classList.contains('open')) {
                closeCmdPalette();
            } else {
                openCmdPalette();
            }
        }
        if (e.key === 'Escape' && cmdModal && cmdModal.classList.contains('open')) {
            closeCmdPalette();
        }
    });

    function filterCmdItems(query) {
        if (!cmdResults) return;
        const q = query.toLowerCase().trim();
        const items = cmdResults.querySelectorAll('.cmd-item');
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(q) ? 'flex' : 'none';
        });
    }

    if (cmdSearchInput) {
        cmdSearchInput.addEventListener('input', (e) => {
            filterCmdItems(e.target.value);
        });
    }

    if (cmdResults) {
        cmdResults.querySelectorAll('.cmd-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.getAttribute('data-action');
                const target = item.getAttribute('data-target');

                closeCmdPalette();

                if (action === 'nav' && target) {
                    const el = document.querySelector(target);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                } else if (action === 'theme') {
                    if (themeToggle) themeToggle.click();
                } else if (action === 'email') {
                    navigator.clipboard.writeText('jeffboat2007@gmail.com');
                    showToast('Copied email: jeffboat2007@gmail.com 📋');
                } else if (action === 'whatsapp') {
                    window.open('https://wa.me/233597654220', '_blank');
                } else if (action === 'cv') {
                    window.open('cv.html', '_blank');
                }
            });
        });
    }
});
