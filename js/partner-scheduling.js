const bookingForm = document.querySelector('#partner-booking-form');
const dateInput = document.querySelector('#session-date');
const locationSelect = document.querySelector('#session-location');
const locationDetailsField = document.querySelector('#location-details-field');
const locationDetailsInput = document.querySelector('#location-details');

// Disallow selecting a date in the past, using the visitor's local date.
if (dateInput) {
  const localToday = new Date();
  localToday.setMinutes(localToday.getMinutes() - localToday.getTimezoneOffset());
  dateInput.min = localToday.toISOString().slice(0, 10);
}

function updateLocationDetails() {
  if (!locationSelect || !locationDetailsField || !locationDetailsInput) return;

  const requiresDetails = locationSelect.value === 'Partner’s home' || locationSelect.value === 'Field of choice';
  locationDetailsField.hidden = !requiresDetails;
  locationDetailsInput.required = requiresDetails;
  locationDetailsInput.autocomplete = locationSelect.value === 'Partner’s home' ? 'street-address' : 'off';
}

if (locationSelect) {
  locationSelect.addEventListener('change', updateLocationDetails);
}

if (bookingForm) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!bookingForm.reportValidity()) return;

    const data = new FormData(bookingForm);
    const location = data.get('locationDetails')
      ? `${data.get('location')} — ${data.get('locationDetails')}`
      : data.get('location');
    const details = [
      'Training session request from an existing partner',
      `Parent/guardian: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Session type: ${data.get('sessionType')}`,
      `Preferred date: ${data.get('date')}`,
      `Preferred time: ${data.get('time')}`,
      `Preferred location: ${location}`,
      `Coordination notes: ${data.get('notes') || 'None provided'}`,
      '',
      'Please reply to confirm availability or suggest another date or time.'
    ].join('\n');
    const subject = encodeURIComponent('Thetis partner training session request');
    const body = encodeURIComponent(details);
    const status = document.querySelector('#partner-form-status');

    if (status) {
      status.textContent = 'Your email app should open with the request. The session is not booked until our team confirms it.';
    }

    window.location.href = `mailto:thetisoldnorth@gmail.com?subject=${subject}&body=${body}`;
  });
}
