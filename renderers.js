// ====== DYNAMIC RENDER MODULES ====== //

function renderAboutAndResearch(data) {
    const container = document.getElementById('about-container');
    if (!container) return;
    
    const info = data.personal_info;
    const research = data.research_focus;
    
    let html = `
        <div class="bento-item bento-intro glass-panel highlight-border">
            <h3 class="bento-title">Who I Am</h3>
            <p>${info.bio}</p>
        </div>
        <div class="bento-item bento-stats glass-panel">
            <div class="stat-box">
                <span class="stat-num">${data.projects.length}+</span>
                <span class="stat-label">Projects</span>
            </div>
            <div class="stat-box">
                <span class="stat-num">${data.skills.frameworks_tools.length}+</span>
                <span class="stat-label">Technologies</span>
            </div>
            <div class="stat-box">
                <span class="stat-num">100%</span>
                <span class="stat-label">Dedication</span>
            </div>
        </div>
        <div class="bento-item bento-research glass-panel bento-full-width">
            <h3 class="bento-title">Research Focus & Interdisciplinary AI</h3>
            <div class="research-grid">
                ${research.map(r => `
                    <div class="research-card glow-card">
                        <div class="research-icon-wrapper">${r.icon}</div>
                        <h4>${r.title}</h4>
                        <p>${r.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    container.innerHTML = html;
}

function renderSkills(data) {
    const container = document.getElementById('skills-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="bento-item glass-panel">
            <h3 class="bento-title">Programming Languages</h3>
            <div class="skill-tags">
                ${data.skills.programming_languages.map(sk => `<span class="tech-tag primary-glow">${sk}</span>`).join('')}
            </div>
        </div>
        <div class="bento-item glass-panel">
            <h3 class="bento-title">Frameworks & Tools</h3>
            <div class="skill-tags">
                ${data.skills.frameworks_tools.map(sk => `<span class="tech-tag outline-glow">${sk}</span>`).join('')}
            </div>
        </div>
        <div class="bento-item glass-panel">
            <h3 class="bento-title">Currently Exploring</h3>
            <div class="skill-tags">
                ${data.skills.currently_learning.map(sk => `<span class="tech-tag subtle-glow">${sk}</span>`).join('')}
            </div>
        </div>
    `;
}

function renderTimeline(data) {
    const container = document.getElementById('timeline-container');
    if (!container || !data.timeline) return;
    
    container.innerHTML = data.timeline.map((item, index) => {
        let imageHtml = item.image ? `<img src="${item.image}" alt="${item.title}" class="timeline-image" loading="lazy">` : '';
        return `
        <div class="timeline-item glass-panel" style="animation-delay: ${index * 0.15}s">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <span class="timeline-year">${item.year}</span>
                <h4 class="timeline-title">${item.title}</h4>
                <span class="timeline-institution highlight-text">${item.institution}</span>
                ${imageHtml}
                <p class="timeline-desc">${item.description}</p>
            </div>
        </div>
        `
    }).join('');
}

function renderProjects(data) {
    const container = document.getElementById('projects-container');
    const filtersContainer = document.getElementById('projects-filters');
    if (!container) return;
    
    if(filtersContainer) {
        filtersContainer.innerHTML = `
            <button class="filter-btn filter-btn--active glass-panel" data-filter="all">All</button>
            <button class="filter-btn glass-panel" data-filter="ai">AI/ML</button>
            <button class="filter-btn glass-panel" data-filter="mobile">Mobile</button>
            <button class="filter-btn glass-panel" data-filter="web">Web</button>
        `;
    }

    container.innerHTML = data.projects.map((project) => {
        let cat = "web";
        let techString = project.technologies.join(' ').toLowerCase();
        if(techString.includes('yolo') || techString.includes('machine learning') || techString.includes('python') || techString.includes('ai')) cat = "ai";
        if(techString.includes('android') || techString.includes('kotlin') || techString.includes('mobile')) cat = "mobile";
        
        let actionsHtml = '';
        if (project.github || project.download) {
            actionsHtml = `onclick="openProjectModal(this)"`;
        }
        
        let bgHtml = project.image ? `<img src="${project.image}" alt="" class="project-bg-image" loading="lazy">` : '';

        return `
        <div class="project-card glass-panel" data-category="${cat}" 
            data-github="${project.github || ''}" 
            data-download="${project.download || ''}"
            ${actionsHtml} tabindex="0" role="button">
            ${bgHtml}
            <div class="project-card__content">
                <h3 class="project-card__title">${project.name}</h3>
                <p class="project-card__description">${project.description}</p>
                <div class="project-card__tech">
                    ${project.technologies.map(tech => `<span class="tech-tag status">${tech}</span>`).join('')}
                </div>
                <div class="project-card__status status status--success">${project.status}</div>
            </div>
        </div>
        `;
    }).join('');
}

function renderTechMarquee(data) {
    const track = document.getElementById('marquee-track');
    if (!track) return;
    
    const allSkills = [...new Set([
        ...data.skills.programming_languages, 
        ...data.skills.frameworks_tools, 
        ...data.skills.currently_learning
    ])];
    
    const marqueeItems = [...allSkills, ...allSkills, ...allSkills, ...allSkills, ...allSkills];
    
    track.innerHTML = marqueeItems.map(skill => `
        <div class="marquee-item glass-panel glow-tag">${skill}</div>
    `).join('');
}

function initProjectFiltersDynamic() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if(!filterButtons.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const filterValue = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
            this.classList.add('filter-btn--active');
            
            projectCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCat.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => card.classList.add('animate-in'), 10);
                } else {
                    card.style.display = 'none';
                    card.classList.remove('animate-in');
                }
            });
        });
    });
}
