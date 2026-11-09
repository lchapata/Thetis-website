const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');

function closeMobileNavigation() {
  if (!menuButton || !navigation) return;

  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}

function initializeMobileNavigation() {
  if (!menuButton || !navigation) return;

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    const nextState = !isOpen;

    menuButton.setAttribute('aria-expanded', String(nextState));
    menuButton.setAttribute('aria-label', nextState ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', nextState);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileNavigation);
  });
}

function initializeCurrentYear() {
  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();
}

function initializeInterestForm() {
  const interestForm = document.querySelector('#interest-form');
  if (!interestForm) return;

  interestForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const status = document.querySelector('#form-status');
    if (!interestForm.reportValidity()) return;

    const name = document.querySelector('#guardian-name').value.trim();
    const email = document.querySelector('#guardian-email').value.trim();
    const message = document.querySelector('#guardian-message').value.trim();
    const subject = encodeURIComponent('Thetis — Expression of Interest');
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message || 'I would like to learn more about Thetis.'}`
    );

    window.location.href = `mailto:thetisoldnorth@gmail.com?subject=${subject}&body=${body}`;

    if (status) {
      status.textContent = 'Your email app should open with a prepared draft. Please send it to complete your inquiry.';
    }
  });
}

initializeMobileNavigation();
initializeCurrentYear();
initializeInterestForm();
