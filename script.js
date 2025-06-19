document.addEventListener('DOMContentLoaded', () => {
  // Animate visitor count to 1,000,000
  let countEl = document.getElementById('visitor-count');
  let count = 0, target = 1000000;
  let step = Math.ceil(target / (3000/16));
  const interval = setInterval(() => {
    count = Math.min(count + step, target);
    countEl.textContent = count.toLocaleString('en-IN');
    if (count >= target) clearInterval(interval);
  }, 16);

  // Registration AJAX (simulate SQL-backed submission)
  const form = document.getElementById('registration-form');
  const status = document.getElementById('form-status');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    fetch('/register-event', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(Object.fromEntries(data))
    }).then(res => res.json())
      .then(json => status.textContent = json.success ? "Registered successfully!" : "Error, try again.")
      .catch(() => status.textContent = "Network error.");
  });
});
