export function validateEmailInput(email) {
  const hasLetter = /[a-zA-Z]/.test(email); // check if there is at least one letter
  const hasNumber = /[0-9]/.test(email); // check if there is at least one number
  const hasAtSymbol = /@/.test(email); // check if there is an '@' symbol
  const isLongEnough = email.length >= 10; // check if at least 10 characters

  if (!email) {
    return {
      valid: false,
      message: "Email field is null",
    };
  }
  if (!isLongEnough) {
    return {
      valid: false,
      message: "Email must be at least 10 characters long",
    };
  }
  if (!hasLetter || !hasNumber) {
    return {
      valid: false,
      message: "Email must contain both letters and numbers",
    };
  }
  if (!hasAtSymbol) {
    return { valid: false, message: "Email must contain an '@' symbol" };
  }
  return { valid: true, message: "Valid email" };
}

export function validatePasswordInput(password) {
  const hasLetter = /[a-zA-Z]/.test(password); // check for at least one letter
  const hasNumber = /[0-9]/.test(password); // check for at least one number
  const isLongEnough = password.length >= 10; // check minimum length

  if (!password) {
    return {
      valid: false,
      message: "Password field is null",
    };
  }
  if (!isLongEnough) {
    return {
      valid: false,
      message: "Password must be at least 10 characters long",
    };
  }
  if (!hasLetter || !hasNumber) {
    return {
      valid: false,
      message: "Password must contain both letters and numbers",
    };
  }
  return { valid: true, message: "Valid password." };
}
