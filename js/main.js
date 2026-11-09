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

// Keep participant-facing site copy gender-inclusive while retaining exact layout.
function applyInclusiveCopy() {
  const replacements = new Map([
    ['For mothers and guardians', 'For families and guardians'],
    ['Your son has potential.', 'Every young person has potential.'],
    ['We help him develop it.', 'We help them develop it.'],
    [
      'A mother’s influence. A mentor’s guidance. A young man’s potential.',
      'A family’s support. A mentor’s guidance. A young person’s potential.'
    ]
  ]);
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;

  while ((node = walker.nextNode())) {
    let text = node.nodeValue;
    text = text.replace(/\bboys\b/gi, 'children');
    replacements.forEach((replacement, original) => {
      text = text.replaceAll(original, replacement);
    });
    node.nodeValue = text;
  }
}

applyInclusiveCopy();

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
    if (status) {
      status.textContent = 'Your email app should open with a prepared draft. Please send it to complete your inquiry.';
    }
  });
}

const partnerForm = document.querySelector('#partner-booking-form');
const partnerLocation = document.querySelector('#session-location');
const partnerLocationField = document.querySelector('#location-details-field');
const partnerLocationDetail = document.querySelector('#location-details');
const partnerDate = document.querySelector('#session-date');

// Partner-preferred slots are requests; prevent past dates and confirm manually.
if (partnerDate) {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  partnerDate.min = today.toISOString().slice(0, 10);
}

if (partnerLocation && partnerLocationField && partnerLocationDetail) {
  const fieldChoice = partnerLocation.querySelector('option[value="Field of choice"]');
  if (fieldChoice) {
    fieldChoice.value = 'Other field';
    fieldChoice.textContent = 'Other field';
  }

  const locationDetailsLabel = partnerLocationField.querySelector('label[for="location-details"]');
  const updateLocationRequirement = () => {
    const isHome = partnerLocation.value === 'Partner’s home';
    const isOtherField = partnerLocation.value === 'Other field';
    const needsDetail = isHome || isOtherField;

    partnerLocationField.hidden = !needsDetail;
    partnerLocationDetail.required = needsDetail;
    partnerLocationDetail.autocomplete = isHome ? 'street-address' : 'off';

    if (locationDetailsLabel) {
      locationDetailsLabel.textContent = isOtherField
        ? 'Address of the other field *'
        : 'Partner home address *';
    }
    partnerLocationDetail.placeholder = isOtherField
      ? 'Enter the full address of the field'
      : 'Enter the session address';
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
    const location = detailValue && (locationValue === 'Partner’s home' || locationValue === 'Other field')
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
