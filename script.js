// Task 5: дата и время
const clock = document.querySelector('#clock');

function updateTime() {
  const now = new Date();
  // дата и время отдельно, чтобы получилось "October 9, 2026, 10:45:12 AM"
  const date = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const time = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  });
  clock.textContent = date + ', ' + time;
}

updateTime();
setInterval(updateTime, 1000);

// Task 4: смена цвета фона
const colorBtn = document.querySelector('#color-btn');
const colors = ['#ffadad', '#caffbf', '#9bf6ff', '#bdb2ff', '#f4f4f4'];
let i = 0;

colorBtn.addEventListener('click', function () {
  document.body.style.backgroundColor = colors[i];
  i = (i + 1) % colors.length;
});

// Task 2: аккордеон
const questions = document.querySelectorAll('.question');

questions.forEach(function (q) {
  q.addEventListener('click', function () {
    const item = q.parentElement;
    const answer = item.querySelector('.answer');

    item.classList.toggle('active');

    // высота берется из scrollHeight, чтобы длинный ответ не обрезался
    if (item.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      answer.style.maxHeight = '0';
    }
  });
});

// общая проверка email для обеих форм
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// показать / убрать ошибку у поля
function showError(input, errorEl, message) {
  errorEl.textContent = message;
  input.classList.add('invalid');
}

function clearError(input, errorEl) {
  errorEl.textContent = '';
  input.classList.remove('invalid');
}

// Task 3: попап
const openBtn = document.querySelector('#open-popup');
const closeBtn = document.querySelector('#close-popup');
const overlay = document.querySelector('#overlay');

function closePopup() {
  overlay.classList.remove('open');
}

openBtn.addEventListener('click', function () {
  overlay.classList.add('open');
});

closeBtn.addEventListener('click', closePopup);

overlay.addEventListener('click', function (e) {
  if (e.target === overlay) {
    closePopup();
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closePopup();
  }
});

// форма внутри попапа
const contactForm = document.querySelector('#contact-form');
const contactName = document.querySelector('#contact-name');
const contactEmail = document.querySelector('#contact-email');
const contactMessage = document.querySelector('#contact-message');

const contactNameError = document.querySelector('#contact-name-error');
const contactEmailError = document.querySelector('#contact-email-error');
const contactMessageError = document.querySelector('#contact-message-error');
const contactSuccess = document.querySelector('#contact-success');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let valid = true;

  clearError(contactName, contactNameError);
  clearError(contactEmail, contactEmailError);
  clearError(contactMessage, contactMessageError);
  contactSuccess.textContent = '';

  if (contactName.value.trim() === '') {
    showError(contactName, contactNameError, 'Name is required');
    valid = false;
  }

  if (contactEmail.value.trim() === '') {
    showError(contactEmail, contactEmailError, 'Email is required');
    valid = false;
  } else if (!emailRegex.test(contactEmail.value.trim())) {
    showError(contactEmail, contactEmailError, 'Enter a valid email');
    valid = false;
  }

  if (contactMessage.value.trim() === '') {
    showError(contactMessage, contactMessageError, 'Message is required');
    valid = false;
  }

  if (valid) {
    contactSuccess.textContent = 'Thank you! Your message has been sent.';
    contactForm.reset();
    setTimeout(function () {
      contactSuccess.textContent = '';
      closePopup();
    }, 1500);
  }
});

// Task 1: валидация формы регистрации
const form = document.querySelector('#signup-form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPass = document.querySelector('#confirm');

const emailError = document.querySelector('#email-error');
const passwordError = document.querySelector('#password-error');
const confirmError = document.querySelector('#confirm-error');
const formSuccess = document.querySelector('#form-success');

form.addEventListener('submit', function (e) {
  // страница не перезагружается, результат показываем сами
  e.preventDefault();
  let valid = true;

  // очищаем старые ошибки
  clearError(email, emailError);
  clearError(password, passwordError);
  clearError(confirmPass, confirmError);
  formSuccess.textContent = '';

  // проверки
  if (email.value.trim() === '') {
    showError(email, emailError, 'Email is required');
    valid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    showError(email, emailError, 'Enter a valid email');
    valid = false;
  }

  if (password.value === '') {
    showError(password, passwordError, 'Password is required');
    valid = false;
  } else if (password.value.length < 8) {
    showError(password, passwordError, 'Password must be at least 8 characters');
    valid = false;
  }

  if (confirmPass.value === '') {
    showError(confirmPass, confirmError, 'Please confirm your password');
    valid = false;
  } else if (confirmPass.value !== password.value) {
    showError(confirmPass, confirmError, 'Passwords do not match');
    valid = false;
  }

  if (valid) {
    formSuccess.textContent = 'Registration successful!';
    form.reset();
  }
});

// ошибка пропадает, как только пользователь начинает исправлять поле
[
  [email, emailError],
  [password, passwordError],
  [confirmPass, confirmError],
  [contactName, contactNameError],
  [contactEmail, contactEmailError],
  [contactMessage, contactMessageError],
].forEach(function (pair) {
  pair[0].addEventListener('input', function () {
    clearError(pair[0], pair[1]);
  });
});
