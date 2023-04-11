const moveElements = (e) => {
  const shapes = document.querySelectorAll('.shape');
  const tracker = document.querySelector('.tracker');

  tracker.style.top = `${e.clientY}px`;
  tracker.style.left = `${e.clientX}px`;
  tracker.style.opacity = 1;

  shapes.forEach((shape) => {
    const shapeOffset = shape.getAttribute('data-offset');

    let offsetX = (window.innerWidth - e.clientX) * shapeOffset;
    let offsetY = (window.innerHeight - e.clientY) * shapeOffset;

    shape.style.translate = `${offsetX}px ${offsetY}px`;
  });
};

document.addEventListener('mousemove', moveElements);

const send = document.getElementById('send');
const form = document.getElementById('form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const message = document.querySelector('#message');

const er =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners() {
  document.addEventListener('DOMContentLoaded', startApp);

  name.addEventListener('blur', validateField);
  email.addEventListener('blur', validateField);
  message.addEventListener('blur', validateField);

  form.addEventListener('submit', sendEmail);
}

function startApp() {
  send.disabled = true;
}

function validateField(e) {
  if (e.target.value.length > 0) {
    const error = document.querySelector('p.error');
    if (error) {
      error.remove();
    }

    e.target.classList.remove('border', 'border-danger');
    e.target.classList.add('border', 'border-success');
  } else {
    e.target.classList.remove('border', 'border-success');
    e.target.classList.add('border', 'border-danger');
    showError('All fields are required');
  }
  if (e.target.type === 'email') {
    if (er.test(e.target.value)) {
      const error = document.querySelector('p.error');
      if (error) {
        error.remove();
      }
      e.target.classList.remove('border', 'border-danger');
      e.target.classList.add('border', 'border-success');
    } else {
      e.target.classList.remove('border', 'border-success');
      e.target.classList.add('border', 'border-danger');
      showError('Incorrect Email');
    }
  }
  if (er.test(email.value) && name.value !== '' && message.value !== '') {
    send.disabled = false;
  }
}

function showError(message) {
  const messageError = document.createElement('p');
  messageError.textContent = message;
  messageError.classList.add(
    'border',
    'border-danger',
    'background-color',
    'p-3',
    'mt-2',
    'text-center',
    'error'
  );

  const errors = document.querySelectorAll('.error');
  if (errors.length === 0) {
    form.appendChild(messageError);
  }
}

function sendEmail(e) {
  e.preventDefault();

  setTimeout(() => {
    const paragraph = document.createElement('p');
    paragraph.textContent = 'The message was sent successfully';
    paragraph.classList.add(
      'text-center',
      'my-10',
      'p-2',
      'bg-green-500',
      'text-white',
      'font-bold',
      'uppercase'
    );

    form.insertBefore(paragraph);

    setTimeout(() => {
      paragraph.remove();
      resetForm();
    }, 5000);
  }, 3000);
}

function resetForm() {
  form.reset();
  startApp();
}
