const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      navigation.classList.remove('is-open');
    });
  });
}

const year = document.querySelector('[data-current-year]');
if (year) year.textContent = new Date().getFullYear();

const interestForm = document.querySelector('#interest-form');
if (interestForm) {
  interestForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = document.querySelector('#form-status');
    if (!interestForm.reportValidity()) return;

    const name = document.querySelector('#guardian-name').value.trim();
    const email = document.querySelector('#guardian-email').value.trim();
    const message = document.querySelector('#guardian-message').value.trim();
    const subject = encodeURIComponent('Thetis — Expression of Interest');
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message || 'I would like to learn more about Thetis.'}`);
    window.location.href = `mailto:thetisoldnorth@gmail.com?subject=${subject}&body=${body}`;
    status.textContent = 'Your email app should open with a prepared draft. Please send it to complete your inquiry.';
  });
}
