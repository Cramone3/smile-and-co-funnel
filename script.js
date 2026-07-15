document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('lead-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    status.className = 'form-status';
    status.textContent = '';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        status.textContent = "Thanks! Redirecting you to book your assessment...";
        status.classList.add('success');
        form.reset();
        setTimeout(function () {
          window.location.href = 'booking.html';
        }, 1200);
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      status.textContent = 'Something went wrong. Please call us at (555) 123-4567.';
      status.classList.add('error');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Get My Free Smile Assessment';
    }
  });
});
