const videoModal = document.getElementById('videoModal');
const playerContainer = videoModal?.querySelector('.video-container');
let activeModal = null;

function openModal(modal) {
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    activeModal = modal;
}

function closeModal(modal = activeModal) {
    if (!modal) return;
    modal.style.display = 'none';
    if (modal === videoModal && playerContainer) {
        playerContainer.innerHTML = ''; // Ferma il video YouTube
    }
    document.body.style.overflow = '';
    if (activeModal === modal) activeModal = null;
}

// Delegazione eventi per click su modali, bottoni e video
document.addEventListener('click', (e) => {
    if (e.target.closest('#terminologiaBtn')) {
        openModal(document.getElementById('terminologiaModal'));
        return;
    }

    if (e.target.closest('#bibliografiaBtn')) {
        openModal(document.getElementById('bibliografiaModal'));
        return;
    }

    const videoLink = e.target.closest('.video-link');
    if (videoLink) {
        e.preventDefault();
        try {
            const url = new URL(videoLink.getAttribute('href'), window.location.href);
            let videoId = url.searchParams.get('v');
            if (!videoId && url.hostname.includes('youtu.be')) {
                videoId = url.pathname.slice(1);
            }
            if (videoId && playerContainer) {
                const list = url.searchParams.get('list');
                const listParam = list ? `&list=${encodeURIComponent(list)}` : '';
                playerContainer.innerHTML = `<iframe id="videoPlayer" src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0${listParam}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                openModal(videoModal);
            }
        } catch (err) {
            console.error('URL non valido:', err);
        }
        return;
    }

    if (e.target.closest('.close-modal')) {
        closeModal(e.target.closest('.video-modal'));
        return;
    }

    if (e.target.classList.contains('video-modal')) {
        closeModal(e.target);
    }
});

// Chiusura con tasto Escape
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal) {
        closeModal(activeModal);
    }
});
