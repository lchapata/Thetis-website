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

const partnerForm = document.querySelector('#partner-booking-form');
const partnerLocation = document.querySelector('#session-location');
const partnerLocationField = document.querySelector('#location-details-field');
const partnerLocationDetail = document.querySelector('#location-details');

if (partnerLocation && partnerLocationField && partnerLocationDetail) {
  const updateLocationRequirement = () => {
    const needsDetail = partnerLocation.value === 'Partner’s home' || partnerLocation.value === 'Field of choice';
    partnerLocationField.hidden = !needsDetail;
    partnerLocationDetail.required = needsDetail;
  };

  partnerLocation.addEventListener('change', updateLocationRequirement);
  updateLocationRequirement();
}

if (partnerForm) {
  partnerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = document.querySelector('#partner-form-status');
    if (!partnerForm.reportValidity()) return;

    const formData = new FormData(partnerForm);
    const locationValue = formData.get('location');
    const detailValue = formData.get('locationDetails')?.toString().trim();
    const location = detailValue && (locationValue === 'Partner’s home' || locationValue === 'Field of choice')
      ? `${locationValue} — ${detailValue}`
      : locationValue;

    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const sessionType = formData.get('sessionType')?.toString();
    const sessionDate = formData.get('date')?.toString();
    const sessionTime = formData.get('time')?.toString();
    const notes = formData.get('notes')?.toString().trim() || 'None provided';

    const subject = encodeURIComponent('Thetis partner session request');
    const body = encodeURIComponent([
      'Partner session request',
      '',
      `Parent or guardian: ${name}`,
      `Email: ${email}`,
      `Session type: ${sessionType}`,
      `Preferred date: ${sessionDate}`,
      `Preferred time: ${sessionTime}`,
      `Preferred location: ${location}`,
      `Additional notes: ${notes}`,
      '',
      'Please reply to confirm availability or suggest an alternative date or time.'
    ].join('\n'));

    if (status) {
      status.textContent = 'Your email app should open with the session request. The slot is not reserved until we confirm it.';
    }

    window.location.href = `mailto:thetisoldnorth@gmail.com?subject=${subject}&body=${body}`;
  });
}
