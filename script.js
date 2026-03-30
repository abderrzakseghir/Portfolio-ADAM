import data from './data.json';
import profilePhoto from './picadam.png';

document.addEventListener('DOMContentLoaded', () => {
    try {
        populatePortfolio(data);
    } catch (error) {
        console.error('Erreur:', error);
        document.getElementById('hero-name').textContent = "Erreur de chargement";
    }
});

function populatePortfolio(data) {
    // 1. Header / Hero Section
    document.getElementById('hero-name').textContent = data.header.name;
    document.getElementById('hero-title').textContent = data.header.title;
    document.querySelector('#hero-location span').textContent = data.header.location;
    document.getElementById('about-text').textContent = data.about;
    
    // Photo de profil
    const photoEl = document.getElementById('profile-photo');
    if (data.header.photoPlaceholder) {
        photoEl.src = data.header.photoPlaceholder === 'picadam.png'
            ? profilePhoto
            : data.header.photoPlaceholder;
    }

    // Footer
    document.getElementById('footer-name').textContent = data.header.name;
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // 2. Projects Section
    const projectsGrid = document.getElementById('projects-grid');
    data.projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        const name = document.createElement('h3');
        name.className = 'project-name';
        name.textContent = project.name;
        
        const desc = document.createElement('p');
        desc.className = 'project-desc';
        desc.textContent = project.description;
        
        const techList = document.createElement('div');
        techList.className = 'project-tech-list';
        
        if (Array.isArray(project.technologies)) {
            project.technologies.forEach(tech => {
                const tag = document.createElement('span');
                tag.className = 'tech-tag';
                tag.textContent = tech;
                techList.appendChild(tag);
            });
        }
        
        card.appendChild(name);
        card.appendChild(desc);
        card.appendChild(techList);
        projectsGrid.appendChild(card);
    });

    // 3. Timelines (Education, Experience, Volunteering)
    populateTimeline('education-timeline', data.education, item => ({
        date: item.year,
        title: item.degree,
        subtitle: item.school,
        desc: ''
    }));

    populateTimeline('experience-timeline', data.experience, item => ({
        date: item.period,
        title: item.title,
        subtitle: item.company,
        desc: item.description
    }));

    populateTimeline('volunteering-timeline', data.volunteering, item => ({
        date: item.period,
        title: item.title,
        subtitle: item.company,
        desc: item.description
    }));

    // 4. Skills & Hobbies
    populateTags('technical-skills', data.skills.technical);
    populateTags('soft-skills', data.skills.soft);
    populateList('language-skills', data.languages);
    populateList('hobbies-list', data.hobbies);

    // 5. Contact Section
    const emailLink = document.getElementById('contact-email-link');
    emailLink.href = `mailto:${data.contact.email}`;
    document.getElementById('contact-email-text').textContent = data.contact.email;
    
    const phoneLink = document.getElementById('contact-phone-link');
    phoneLink.href = `tel:${data.contact.phone}`;
    document.getElementById('contact-phone-text').textContent = data.contact.phone;
}

// Helper functions
function populateTimeline(containerId, items, mapFn) {
    const container = document.getElementById(containerId);
    if (!container || !items) return;
    
    items.forEach(item => {
        const mapped = mapFn(item);
        const div = document.createElement('div');
        div.className = 'timeline-item';
        
        let html = `
            <div class="timeline-date">${mapped.date}</div>
            <div class="timeline-title">${mapped.title}</div>
            <div class="timeline-subtitle">${mapped.subtitle}</div>
        `;
        
        if (mapped.desc) {
            html += `<div class="timeline-desc">${mapped.desc}</div>`;
        }
        
        div.innerHTML = html;
        container.appendChild(div);
    });
}

function populateTags(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container || !items) return;
    
    items.forEach(item => {
        const span = document.createElement('span');
        span.className = 'skill-tag';
        span.textContent = item;
        container.appendChild(span);
    });
}

function populateList(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container || !items) return;
    
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        container.appendChild(li);
    });
}
