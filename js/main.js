// Main site navigation
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    const nextState = !isOpen;
    menuButton.setAttribute('aria-expanded', String(nextState));
    menuButton.setAttribute('aria-label', nextState ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', nextState);
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

// Use a short, clear navigation label for the appointment section.
const appointmentLink = document.querySelector('#primary-nav a[href="#partners"]');
if (appointmentLink) appointmentLink.textContent = 'Appointments';

// Remove the extra child-specific disclaimer from the interest section.
const interestNote = document.querySelector('.contact .form-note');
if (interestNote) {
  interestNote.textContent = 'This is an expression of interest, not an enrollment application.';
}

// Keep participant-facing site copy gender-inclusive while retaining the existing layout.
const copy = {
  intro: 'Thetis by Old North is a youth development program that uses soccer, mentorship, and family engagement to help young people build discipline, resilience, confidence, character, and purpose for life.',
  mentorship: 'Positive relationships help young people reflect, grow, and take responsibility.',
  familyEyebrow: 'For families and guardians',
  familyHeading: 'Every young person has potential.|We help them develop it.',
  motto: 'A family’s support. A mentor’s guidance. A young person’s potential.',
  faqAudience: 'Thetis is designed for children and families who want to support their growth. Specific age groups and enrollment details will be confirmed before launch.',
  teamLincoln: 'Zimbabwe-born computer engineer, soccer enthusiast, and mentor focused on helping young people build confidence, discipline, teamwork, and life skills through soccer.',
  teamMarcus: 'Mechanical engineer with graduate-level study in business analytics and three years of middle-school teaching experience in New York.'
};

const introCopy = document.querySelector('.intro .body-large');
if (introCopy) introCopy.textContent = copy.intro;

document.querySelectorAll('.principle-card p, .program-copy p').forEach((paragraph) => {
  if (/boys|young men|young man/i.test(paragraph.textContent)) {
    paragraph.textContent = copy.mentorship;
  }
});

const familyEyebrow = document.querySelector('.community-content .eyebrow');
if (familyEyebrow) {
  const textNode = Array.from(familyEyebrow.childNodes).find(
    (node) => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()
  );
  if (textNode) textNode.nodeValue = ` ${copy.familyEyebrow}`;
}

const familyHeading = document.querySelector('.community-content h2');
if (familyHeading) {
  const [firstLine, secondLine] = copy.familyHeading.split('|');
  familyHeading.replaceChildren(document.createTextNode(firstLine), document.createElement('br'));
  const emphasis = document.createElement('em');
  emphasis.textContent = secondLine;
  familyHeading.append(emphasis);
}

const motto = document.querySelector('.motto-quote');
if (motto) motto.textContent = copy.motto;

const audienceAnswer = document.querySelector('.faq-list details:nth-child(2) p');
if (audienceAnswer) audienceAnswer.textContent = copy.faqAudience;

const teamBios = document.querySelectorAll('.team-card p');
if (teamBios[0]) teamBios[0].textContent = copy.teamLincoln;
if (teamBios[1]) teamBios[1].textContent = copy.teamMarcus;

// Keep the separate family/community image as it was before the mistaken replacement.
const communityImage = document.querySelector('.community-image img');
if (communityImage) {
  communityImage.src = 'team-2.png';
  communityImage.alt = 'The Thetis soccer community';
}

// Interest form: prepare an email draft without storing or submitting data to a server.
const interestForm = document.querySelector('#interest-form');
if (interestForm) {
  interestForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!interestForm.reportValidity()) return;

    const name = document.querySelector('#guardian-name').value.trim();
    const email = document.querySelector('#guardian-email').value.trim();
    const message = document.querySelector('#guardian-message').value.trim();
    const subject = encodeURIComponent('Thetis — Expression of Interest');
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message || 'I would like to learn more about Thetis.'}`
    );
    window.location.href = `mailto:thetisoldnorth@gmail.com?subject=${subject}&body=${body}`;

    const status = document.querySelector('#form-status');
    if (status) {
      status.textContent = 'Your email app should open with a prepared draft. Please send it to complete your inquiry.';
    }
  });
}

// Partner session request: ask for an address only for home or other-field selections.
const partnerForm = document.querySelector('#partner-booking-form');
const partnerLocation = document.querySelector('#session-location');
const locationDetailsField = document.querySelector('#location-details-field');
const locationDetails = document.querySelector('#location-details');
const sessionDate = document.querySelector('#session-date');

if (sessionDate) {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  sessionDate.min = today.toISOString().slice(0, 10);
}

if (partnerLocation && locationDetailsField && locationDetails) {
  const otherFieldOption = partnerLocation.querySelector('option[value="Field of choice"]');
  if (otherFieldOption) {
    otherFieldOption.value = 'Other field';
    otherFieldOption.textContent = 'Other field';
  }

  const locationLabel = locationDetailsField.querySelector('label[for="location-details"]');
  const updateLocationPrompt = () => {
    const isOtherField = partnerLocation.value === 'Other field';
    const isHome = partnerLocation.value === 'Partner’s home';
    const requiresDetails = isOtherField || isHome;

    locationDetailsField.hidden = !requiresDetails;
    locationDetails.required = requiresDetails;
    locationDetails.autocomplete = isHome ? 'street-address' : 'off';
    locationDetails.placeholder = isOtherField ? 'Enter the full field address' : 'Enter the session address';

    if (locationLabel) {
      locationLabel.textContent = isOtherField ? 'Other field address *' : 'Partner home address *';
    }
  };

  partnerLocation.addEventListener('change', updateLocationPrompt);
  updateLocationPrompt();
}

if (partnerForm) {
  partnerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!partnerForm.reportValidity()) return;

    const data = new FormData(partnerForm);
    const selectedLocation = data.get('location');
    const locationAddress = data.get('locationDetails')?.toString().trim();
    const location = locationAddress && (selectedLocation === 'Other field' || selectedLocation === 'Partner’s home')
      ? `${selectedLocation}: ${locationAddress}`
      : selectedLocation;

    const subject = encodeURIComponent('Thetis partner session request');
    const body = encodeURIComponent([
      'Partner session request',
      '',
      `Parent or guardian: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Session type: ${data.get('sessionType')}`,
      `Preferred date: ${data.get('date')}`,
      `Preferred time: ${data.get('time')}`,
      `Preferred location: ${location}`,
      `Additional notes: ${data.get('notes')?.toString().trim() || 'None provided'}`,
      '',
      'Please reply to confirm availability or suggest another date or time.'
    ].join('\n'));

    const status = document.querySelector('#partner-form-status');
    if (status) {
      status.textContent = 'Your email app should open with the session request. The slot is not reserved until our team confirms it.';
    }
    window.location.href = `mailto:thetisoldnorth@gmail.com?subject=${subject}&body=${body}`;
  });
}
