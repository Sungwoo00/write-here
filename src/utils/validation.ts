export function isValidEmail(input: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(input);
}

export function isValidPw(input: string): boolean {
  const MIN_LENGTH = 8;
  const MAX_LENGTH = 15;
  const containsLetters = /[a-zA-Z]/.test(input);
  const containsNumbers = /\d/.test(input);
  const containsSpecialChars = /[\W_]/.test(input); // 모든 특수문자 포함
  const isProperLength =
    input.length >= MIN_LENGTH && input.length <= MAX_LENGTH;

  return (
    containsLetters && containsNumbers && containsSpecialChars && isProperLength
  );
}
