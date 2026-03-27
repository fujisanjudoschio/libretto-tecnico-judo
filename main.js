// Smooth scrolling for navigation dots
document.querySelectorAll('.belt-dot').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Video modal functionality
const modal = document.getElementById('videoModal');
const playerContainer = document.querySelector('.video-container');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.video-link').forEach(link => {
    link.addEventListener('click', function (e) {
        if (this.classList.contains('empty')) return;
        e.preventDefault();
        const url = this.getAttribute('href');
        const videoId = url.split('v=')[1]?.split('&')[0];
        if (videoId) {
            // Recreate iframe to ensure a fresh player state
            playerContainer.innerHTML = `<iframe id="videoPlayer" src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    });
});

const hideModal = () => {
    modal.style.display = 'none';
    playerContainer.innerHTML = ''; // Remove iframe to stop video
    document.body.style.overflow = 'auto';
};

closeModal.onclick = hideModal;
window.onclick = (e) => {
    if (e.target == modal) hideModal();
};
