import { getProjects } from './firebase-db.js';

// Projeleri yükle ve görüntüle
export async function loadAndDisplayProjects() {
    const projectsContainer = document.getElementById('projects-container');
    const loadingState = document.getElementById('projects-loading-state');
    const emptyState = document.getElementById('projects-empty-state');

    try {
        // Show loading state
        loadingState.classList.remove('hidden');
        projectsContainer.classList.add('hidden');
        emptyState.classList.add('hidden');

        const projects = await getProjects();
        
        // Hide loading state
        loadingState.classList.add('hidden');
        
        if (projects.length === 0) {
            emptyState.classList.remove('hidden');
            return;
        }

        projectsContainer.classList.remove('hidden');
        projectsContainer.innerHTML = projects.map(project => `
            <div class="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                 data-aos="fade-up">
                <div class="aspect-video w-full overflow-hidden">
                    <img src="${project.imageUrl || 'https://via.placeholder.com/600x400'}" 
                         alt="${project.title}" 
                         class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300">
                </div>
                <div class="p-6">
                    <div class="flex items-center gap-2 mb-4">
                        <span class="px-3 py-1 text-sm rounded-full bg-white/10 text-white/90">
                            ${project.category || 'Proje'}
                        </span>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        ${project.title}
                    </h3>
                    <p class="text-white/70 mb-4 line-clamp-2">
                        ${project.description}
                    </p>
                    <div class="flex items-center gap-4">
                        ${project.githubUrl ? `
                            <a href="${project.githubUrl}" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               class="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                GitHub
                            </a>
                        ` : ''}
                        ${project.liveUrl ? `
                            <a href="${project.liveUrl}" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               class="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                </svg>
                                Canlı Demo
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading projects:', error);
        loadingState.classList.add('hidden');
        projectsContainer.innerHTML = `
            <div class="col-span-full text-center py-20">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-6">
                    <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-white mb-2">Projeler Yüklenemedi</h3>
                <p class="text-white/70">Lütfen daha sonra tekrar deneyin.</p>
            </div>
        `;
    }
}

// Initialize projects when DOM is loaded
document.addEventListener('DOMContentLoaded', loadAndDisplayProjects);



