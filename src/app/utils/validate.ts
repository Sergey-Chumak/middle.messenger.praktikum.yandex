import {
  REG_EXP_VALIDATE_EMAIL,
  REG_EXP_VALIDATE_LOGIN,
  REG_EXP_VALIDATE_NAME,
  REG_EXP_VALIDATE_PASSWORD,
  REG_EXP_VALIDATE_PHONE,
} from '../services/constants';

export function isValidEmail(email: string): boolean {
  if (!email) return false;
  return REG_EXP_VALIDATE_EMAIL.test(email);
}

export function isValidName(name: string): boolean {
  if (!name) return false;
  return REG_EXP_VALIDATE_NAME.test(name);
}

export function isValidPassword(password: string): boolean {
  if (!password) return false;
  return REG_EXP_VALIDATE_PASSWORD.test(password);
}

export function isValidEqualPasswords(password: string, repeatPassword: string): boolean {
  return repeatPassword === password;
}

export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  return REG_EXP_VALIDATE_PHONE.test(phone);
}

export function isValidLogin(login: string): boolean {
  if (!login) return false;
  return REG_EXP_VALIDATE_LOGIN.test(login);
}
