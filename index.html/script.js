const filters = document.querySelectorAll('.filter');
const cards = [...document.querySelectorAll('.course-card')];
const toast = document.querySelector('.toast');
const courseModal = document.querySelector('#course-modal');
const searchModal = document.querySelector('#search-modal');
let toastTimer, storyIndex = 0;
const showToast = (message) => { toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2800); };
const openModal = (modal) => { modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); };
const closeModal = (modal) => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); };
function openCourse(card) { document.querySelector('#modal-category').textContent = `${card.dataset.category} course`; document.querySelector('#modal-title').textContent = card.dataset.title; document.querySelector('#modal-description').textContent = `Learn with ${card.dataset.instructor} through friendly, practical lessons and a final project you will be proud to share.`; document.querySelector('#modal-instructor').textContent = `with ${card.dataset.instructor}`; document.querySelector('#modal-lessons').textContent = `${card.dataset.lessons} lessons`; document.querySelector('#modal-time').textContent = card.dataset.time; openModal(courseModal); }
filters.forEach((filter) => filter.addEventListener('click', () => { filters.forEach((item) => item.classList.remove('selected')); filter.classList.add('selected'); const category = filter.dataset.filter; cards.forEach((card) => card.style.display = category === 'all' || card.dataset.category === category ? 'block' : 'none'); }));
document.querySelector('#load-more').addEventListener('click', (event) => { document.querySelectorAll('.extra-card').forEach((card) => card.style.display = 'block'); event.currentTarget.style.display = 'none'; });
cards.forEach((card) => card.addEventListener('click', () => openCourse(card)));
document.querySelector('#resume-button').addEventListener('click', () => showToast('Resuming “Typography fundamentals” at lesson 6.'));
document.querySelector('#continue-learning').addEventListener('click', () => document.querySelector('#paths').scrollIntoView({ behavior: 'smooth' }));
document.querySelector('#community-button').addEventListener('click', () => showToast('Welcome! Your community invitation is on its way.'));
document.querySelector('#enrol-button').addEventListener('click', () => { closeModal(courseModal); showToast('You’re enrolled — your first lesson is ready!'); });
document.querySelector('#search-button').addEventListener('click', () => { openModal(searchModal); document.querySelector('#course-search').focus(); });
document.querySelector('#course-search').addEventListener('input', (event) => { const query = event.target.value.trim().toLowerCase(); const matches = cards.filter((card) => !query || `${card.dataset.title} ${card.dataset.category} ${card.dataset.instructor}`.toLowerCase().includes(query)); document.querySelector('#search-results').innerHTML = matches.length ? matches.map((card) => `<div class="search-result" data-course="${card.dataset.title}"><strong>${card.dataset.title}</strong><span>${card.dataset.category} · ${card.dataset.lessons} lessons</span></div>`).join('') : '<p>No courses match that search just yet.</p>'; document.querySelectorAll('.search-result').forEach((result) => result.addEventListener('click', () => { const card = cards.find((item) => item.dataset.title === result.dataset.course); closeModal(searchModal); openCourse(card); })); });
document.querySelectorAll('.modal-close').forEach((button) => button.addEventListener('click', () => closeModal(button.closest('.modal'))));
document.querySelectorAll('.modal').forEach((modal) => modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(modal); }));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') document.querySelectorAll('.modal.open').forEach(closeModal); });
function showStory(index) { const stories = document.querySelectorAll('.story'); storyIndex = (index + stories.length) % stories.length; stories.forEach((story, i) => story.classList.toggle('active', i === storyIndex)); }
document.querySelector('#previous-story').addEventListener('click', () => showStory(storyIndex - 1));
document.querySelector('#next-story').addEventListener('click', () => showStory(storyIndex + 1));
document.querySelector('.menu-toggle').addEventListener('click', (event) => { const nav = document.querySelector('#main-nav'); const open = nav.style.display === 'flex'; nav.style.display = open ? 'none' : 'flex'; event.currentTarget.setAttribute('aria-expanded', String(!open)); });
