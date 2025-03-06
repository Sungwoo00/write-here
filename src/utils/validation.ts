export function isValidId(input: string): boolean {
  const baseRegex = /^(?=.*[a-zA-Z])([a-zA-Z0-9]{6,12})$/;

  if (input.includes('@')) {
    const [beforeAt, afterAt] = input.split('@');
    const isBeforeValid = baseRegex.test(beforeAt);
    const afterRegex = /^[a-zA-Z]+\.[a-zA-Z]+$/;
    const isAfterValid = afterRegex.test(afterAt);

    return isBeforeValid || isAfterValid;
  }

  return baseRegex.test(input);
}

export function isValidPw(input: string): boolean {
  const MIN_LENGTH = 8;
  const MAX_LENGTH = 15;
  const containsLetters = /[a-zA-Z]/.test(input);
  const containsNumbers = /\d/.test(input);
  const containsSpecialChars = /[~!@#$%^&*]/.test(input);
  const isProperLength =
    input.length >= MIN_LENGTH && input.length <= MAX_LENGTH;

  return (
    containsLetters && containsNumbers && containsSpecialChars && isProperLength
  );
}

export function isValidEmail(input: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(input);
}
