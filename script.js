// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

// Active link highlight
const path = location.pathname.split('/').pop() || 'index.html';
for (const a of document.querySelectorAll('#site-nav a')) {
  const href = a.getAttribute('href');
  if (href && href.endsWith(path)) a.classList.add('active');
}


// Mobile nav toggle
(function slider(){
const slider = document.querySelector('.slider');
if (!slider) return;
const slides = [...slider.querySelectorAll('.slide')];
const dots = slider.querySelector('.slider-dots');
let i = 0;
function show(idx){
slides.forEach((s, j) => s.classList.toggle('current', j === idx));
if (dots){
[...dots.children].forEach((d, j) => d.classList.toggle('active', j === idx));
}
}
slides.forEach((_s, idx) => {
const b = document.createElement('button');
b.addEventListener('click', ()=>{ i = idx; show(i); });
dots && dots.appendChild(b);
});
show(i);
setInterval(()=>{ i = (i + 1) % slides.length; show(i); }, 6000);
})();


// Modal dialogs (case studies)
for (const openBtn of document.querySelectorAll('[data-modal]')) {
openBtn.addEventListener('click', () => {
const id = openBtn.getAttribute('data-modal');
const dlg = document.getElementById(id);
dlg && dlg.showModal();
});
}
for (const closeBtn of document.querySelectorAll('[data-close]')) {
closeBtn.addEventListener('click', (e) => {
const dlg = e.target.closest('dialog');
dlg && dlg.close();
});
}


// Contact form validation (front‑end demo)
const form = document.getElementById('contact-form');
if (form) {
form.addEventListener('submit', (e) => {
e.preventDefault();
const name = form.name.value.trim();
const email = form.email.value.trim();
const message = form.message.value.trim();


let ok = true;
const err = (id, msg) => { const el = document.getElementById(id); if (el) el.textContent = msg; if (msg) ok = false; };


err('err-name', name ? '' : 'Please enter your name.');
err('err-email', /.+@.+\..+/.test(email) ? '' : 'Enter a valid email.');
err('err-message', message.length >= 10 ? '' : 'Add a bit more detail (10+ chars).');


if (!ok) return;


const status = form.querySelector('.form-status');
status.textContent = 'Thanks! Your message was validated locally.';
form.reset();
});
}