let recaptchaToken = null;

grecaptcha.ready(function() {
  grecaptcha.execute('6LcXbQAsAAAAALaTlfNT8wPPcWYWnS02QGIwSilT', { action: 'submit_form' })
    .then(token => {
      recaptchaToken = token;
      document.getElementById('g-recaptcha-response').value = token;
      document.getElementById('sendMessageBtn').disabled = false; // Enable button
      document.getElementById('captchaStatus').textContent = '✓ reCAPTCHA OK';
      document.getElementById('captchaStatus').className = 'text-sm text-green-500';
    })
    .catch(err => {
      console.error('reCAPTCHA error', err);
      document.getElementById('captchaStatus').textContent = 'reCAPTCHA issue';
      document.getElementById('captchaStatus').className = 'text-sm text-red-500';
    });

  document.getElementById('sendMessageBtn').addEventListener('click', function(event) {
    event.preventDefault();
    let valid = true;
    const fields = [
      { id: 'name', errorId: 'nameError', check: val => val.trim() },
      { id: 'email', errorId: 'emailError', check: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) },
      { id: 'message', errorId: 'messageError', check: val => val.trim().length >= 60 }
    ];

    fields.forEach(field => {
      const elem = document.getElementById(field.id);
      if (!field.check(elem.value)) {
        elem.style.borderColor = 'red';
        document.getElementById(field.errorId).classList.remove('hidden');
        valid = false;
      } else {
        elem.style.borderColor = '';
        document.getElementById(field.errorId).classList.add('hidden');
      }
    });

    if (valid && recaptchaToken) {
      document.getElementById('contactForm').submit();
    } else {
      console.log('Form invalid or no reCAPTCHA token');
    }
  });
});