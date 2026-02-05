/* ============================================
   PORTFOLIO APP - Main Application Logic
   ============================================ */

class PortfolioApp {
    constructor() {
        this.config = null;
        this.container = document.getElementById('app');
    }

    async init() {
        try {
            await this.loadConfig();
            this.render();
            this.setupEventListeners();
            this.setupScrollAnimations();
        } catch (error) {
            console.error('Failed to initialize portfolio:', error);
            this.showError('Failed to load portfolio configuration');
        }
    }

    async loadConfig() {
        const response = await fetch('config.yaml');
        const yamlText = await response.text();
        this.config = jsyaml.load(yamlText);
    }

    render() {
        const { personal, about, experience, skills, certifications, education, theme } = this.config;

        // Remove loading state
        this.container.classList.remove('loading');

        this.container.innerHTML = `
            <!-- Navigation -->
            <nav>
                <div class="nav-container">
                    <div class="nav-logo">${personal.name.first.charAt(0)}_${personal.name.last.toUpperCase()}</div>
                    <ul class="nav-links" id="navLinks">
                        <li><a href="#about">About</a></li>
                        <li><a href="#experience">Experience</a></li>
                        <li><a href="#skills">Skills</a></li>
                        <li><a href="#certifications">Certs</a></li>
                        <li><a href="#education">Education</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                    <div class="hamburger" id="hamburger">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </nav>

            <!-- Hero Section -->
            <section class="hero" id="hero">
                <div class="hero-bg"></div>
                <div class="hero-grid"></div>
                <div class="hero-content">
                    <div class="hero-badge">
                        <span class="dot"></span>
                        ${personal.status}
                    </div>
                    <h1>
                        <span class="first-name">${personal.name.first}</span>
                        <span class="last-name">${personal.name.last}</span>
                    </h1>
                    <p class="hero-subtitle">
                        <span class="highlight">${personal.title}</span> // ${personal.tagline} — 
                        ${personal.summary}
                    </p>
                    <div class="hero-buttons">
                        <a href="#contact" class="btn btn-primary">Initialize Contact</a>
                        <a href="#experience" class="btn btn-secondary">View Datalog</a>
                        <button class="btn btn-download" id="downloadPdf">
                            ⬇ Download CV
                        </button>
                    </div>
                </div>
            </section>

            <!-- About Section -->
            <section id="about">
                <div class="section-header fade-in">
                    <div class="section-label">// System Profile</div>
                    <h2 class="section-title">${about.title}</h2>
                </div>
                <div class="about-grid">
                    <div class="about-text fade-in">
                        ${about.paragraphs.map(p => `<p>${p}</p>`).join('')}
                    </div>
                    <div class="about-stats fade-in">
                        ${about.stats.map(stat => `
                            <div class="stat-card">
                                <div class="stat-number">${stat.value}</div>
                                <div class="stat-label">${stat.label}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>

            <!-- Experience Section -->
            <section id="experience">
                <div class="section-header fade-in">
                    <div class="section-label">// Employment History</div>
                    <h2 class="section-title">Mission Logs</h2>
                </div>
                <div class="timeline">
                    ${experience.map(job => `
                        <div class="timeline-item fade-in">
                            <div class="timeline-card">
                                <div class="timeline-header">
                                    <span class="timeline-role">${job.role}</span>
                                    <span class="timeline-date">${job.period}</span>
                                </div>
                                <div class="timeline-company">${job.company} // ${job.location}</div>
                                <ul class="timeline-details">
                                    ${job.highlights.map(h => `<li>${h}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- Skills Section -->
            <section id="skills">
                <div class="section-header fade-in">
                    <div class="section-label">// Technical Specs</div>
                    <h2 class="section-title">Skills Matrix</h2>
                </div>
                <div class="skills-grid">
                    ${skills.map(skill => `
                        <div class="skill-card fade-in">
                            <div class="skill-icon">${skill.icon}</div>
                            <h3>${skill.category}</h3>
                            <div class="skill-tags">
                                ${skill.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- Certifications Section -->
            <section id="certifications">
                <div class="section-header fade-in">
                    <div class="section-label">// Credentials</div>
                    <h2 class="section-title">Certified Protocols</h2>
                </div>
                <div class="certs-grid">
                    ${certifications.map(cert => `
                        <div class="cert-card fade-in">
                            <div class="cert-icon">${cert.icon}</div>
                            <div class="cert-info">
                                <h3>${cert.name}</h3>
                                <p>${cert.issuer} // ${cert.year}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- Education Section -->
            <section id="education">
                <div class="section-header fade-in">
                    <div class="section-label">// Origin Data</div>
                    <h2 class="section-title">Academic Foundation</h2>
                </div>
                ${education.map(edu => `
                    <div class="edu-card fade-in">
                        <h3>${edu.degree}</h3>
                        <div class="school">${edu.institution}</div>
                        <div class="year">${edu.period}</div>
                    </div>
                `).join('')}
            </section>

            <!-- Contact Section -->
            <section id="contact">
                <div class="section-header fade-in">
                    <div class="section-label">// Communication Channels</div>
                    <h2 class="section-title">Initialize Connection</h2>
                </div>
                <div class="contact-grid">
                    <a href="mailto:${personal.contact.email}" class="contact-card fade-in">
                        <div class="contact-icon">📧</div>
                        <h3>Email</h3>
                        <p>${personal.contact.email}</p>
                    </a>
                    <a href="tel:${personal.contact.phone.replace(/\s/g, '')}" class="contact-card fade-in">
                        <div class="contact-icon">📱</div>
                        <h3>Phone</h3>
                        <p>${personal.contact.phone}</p>
                    </a>
                    <a href="${personal.contact.linkedin.url}" target="_blank" class="contact-card fade-in">
                        <div class="contact-icon">💼</div>
                        <h3>LinkedIn</h3>
                        <p>${personal.contact.linkedin.display}</p>
                    </a>
                    <a href="${personal.contact.website.url}" target="_blank" class="contact-card fade-in">
                        <div class="contact-icon">🌐</div>
                        <h3>Website</h3>
                        <p>${personal.contact.website.display}</p>
                    </a>
                </div>
            </section>

            <!-- Footer -->
            <footer>
                <p>© ${theme.copyright_year} ${personal.name.first} ${personal.name.last} // <span>${theme.footer_text}</span></p>
            </footer>
        `;
    }

    setupEventListeners() {
        // Mobile nav toggle
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close nav on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Glitch effect on hover
        const lastName = document.querySelector('.last-name');
        if (lastName) {
            lastName.addEventListener('mouseenter', () => {
                lastName.style.animation = 'glitch 0.3s infinite';
            });
            lastName.addEventListener('mouseleave', () => {
                lastName.style.animation = 'glitchText 3s infinite';
            });
        }

        // PDF Download
        const downloadBtn = document.getElementById('downloadPdf');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.generatePDF());
        }
    }

    setupScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target); // Stop observing once visible
                    }
                });
            }, { 
                threshold: 0.1,
                rootMargin: '50px' // Trigger slightly before element enters viewport
            });

            fadeElements.forEach(el => observer.observe(el));
        } else {
            // Fallback: just show all elements
            fadeElements.forEach(el => el.classList.add('visible'));
        }
    }

    async generatePDF() {
        const { personal } = this.config;
        const btn = document.getElementById('downloadPdf');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '⏳ Generating...';
        btn.disabled = true;

        // Create a clean version for PDF
        const pdfContent = this.createPDFContent();
        
        const opt = {
            margin: [10, 15, 10, 15],
            filename: `${personal.name.first}_${personal.name.last}_CV.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                letterRendering: true,
                logging: false
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait' 
            },
            pagebreak: { 
                mode: ['css', 'legacy'],
                avoid: ['.pdf-job', '.pdf-header', '.pdf-edu', '.pdf-cert']
            }
        };

        try {
            await html2pdf().set(opt).from(pdfContent).save();
        } catch (error) {
            console.error('PDF generation failed:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }

    createPDFContent() {
        const { personal, about, experience, skills, certifications, education } = this.config;

        const container = document.createElement('div');
        container.innerHTML = `
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 10px; line-height: 1.3; color: #333; }
                .pdf-container { padding: 15px 20px; max-width: 800px; }
                
                /* Header */
                .pdf-header { text-align: center; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #00f0ff; }
                .pdf-header h1 { font-size: 24px; color: #1a1a2e; margin-bottom: 3px; text-transform: uppercase; letter-spacing: 2px; }
                .pdf-header .title { font-size: 11px; color: #00f0ff; font-weight: 600; }
                .pdf-header .contact { font-size: 9px; color: #666; margin-top: 8px; }
                .pdf-header .contact span { margin: 0 8px; }
                
                /* Sections */
                .pdf-section { margin-bottom: 12px; page-break-inside: avoid; }
                .pdf-section h2 { font-size: 12px; color: #ff2a6d; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #ff2a6d; padding-bottom: 3px; margin-bottom: 8px; }
                .pdf-section p { margin-bottom: 5px; text-align: justify; font-size: 9px; }
                
                /* Jobs */
                .pdf-job { margin-bottom: 10px; page-break-inside: avoid; break-inside: avoid; }
                .pdf-job-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
                .pdf-job-title { font-weight: 700; font-size: 10px; color: #1a1a2e; }
                .pdf-job-date { font-size: 9px; color: #00f0ff; }
                .pdf-job-company { font-size: 9px; color: #666; margin-bottom: 3px; }
                .pdf-job ul { margin-left: 12px; }
                .pdf-job li { margin-bottom: 1px; font-size: 9px; }
                
                /* Skills - Grid layout for better space usage */
                .pdf-skills { 
                    display: grid; 
                    grid-template-columns: repeat(3, 1fr); 
                    gap: 8px;
                }
                .pdf-skill-group { 
                    margin-bottom: 5px;
                }
                .pdf-skill-group h3 { font-size: 9px; color: #1a1a2e; margin-bottom: 2px; }
                .pdf-skill-group .tags { font-size: 8px; color: #666; line-height: 1.4; }
                
                /* Certifications */
                .pdf-certs { 
                    display: block;
                    margin-top: 5px;
                }
                .pdf-cert { 
                    font-size: 9px; 
                    margin-bottom: 5px;
                    display: block;
                }
                .pdf-cert strong { color: #1a1a2e; }
                
                /* Education */
                .pdf-edu { 
                    text-align: center;
                    margin-top: 5px;
                }
                .pdf-edu h3 { font-size: 10px; color: #1a1a2e; }
                .pdf-edu p { font-size: 9px; color: #666; }
                
                /* Page break helpers */
                .page-break-before { page-break-before: always; break-before: always; }
                .no-break { page-break-inside: avoid; break-inside: avoid; }
            </style>
            <div class="pdf-container">
                <div class="pdf-header">
                    <h1>${personal.name.first} ${personal.name.last}</h1>
                    <div class="title">${personal.title} | ${personal.tagline}</div>
                    <div class="contact">
                        <span>📧 ${personal.contact.email}</span>
                        <span>📱 ${personal.contact.phone}</span>
                        <span>🔗 ${personal.contact.linkedin.display}</span>
                        <span>🌐 ${personal.contact.website.display}</span>
                    </div>
                </div>

                <div class="pdf-section">
                    <h2>Professional Summary</h2>
                    ${about.paragraphs.map(p => `<p>${p}</p>`).join('')}
                </div>

                <div class="pdf-section">
                    <h2>Work Experience</h2>
                    ${experience.map(job => `
                        <div class="pdf-job">
                            <div class="pdf-job-header">
                                <span class="pdf-job-title">${job.role}</span>
                                <span class="pdf-job-date">${job.period}</span>
                            </div>
                            <div class="pdf-job-company">${job.company} | ${job.location}</div>
                            <ul>
                                ${job.highlights.map(h => `<li>${h}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>

                <div class="pdf-section">
                    <h2>Technical Skills</h2>
                    <div class="pdf-skills">
                        ${skills.map(skill => `
                            <div class="pdf-skill-group">
                                <h3>${skill.icon} ${skill.category}</h3>
                                <div class="tags">${skill.items.join(' • ')}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="pdf-section">
                    <h2>Certifications</h2>
                    <div class="pdf-certs">
                        ${certifications.map(cert => `
                            <div class="pdf-cert">
                                <strong>${cert.name}</strong> - ${cert.issuer} (${cert.year})
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="pdf-section">
                    <h2>Education</h2>
                    ${education.map(edu => `
                        <div class="pdf-edu">
                            <h3>${edu.degree}</h3>
                            <p>${edu.institution} | ${edu.period}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        return container;
    }

    showError(message) {
        this.container.innerHTML = `
            <div class="loading" style="color: var(--red);">
                ERROR: ${message}
            </div>
        `;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    app.init();
});
