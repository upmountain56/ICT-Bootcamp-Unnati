// Utility functions
export function showError(id, message) {
  const el = document.getElementById(id);
  if (el) el.textContent = message;
}

export function clearErrors(...ids) {
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = "";
  });
}

export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) && email.length >= 5 && email.length <= 50;
}

export function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,32}$/;
  return regex.test(password);
}

export function validateNepaliPhone(phone) {
  return /^[9][78]\d{8}$/.test(phone);
}
