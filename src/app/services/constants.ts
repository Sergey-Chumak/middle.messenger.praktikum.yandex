export const REG_EXP_VALIDATE_LOGIN = /^\b[A-Za-z]+[\w\-]{2,19}\b$/;
export const REG_EXP_VALIDATE_PASSWORD = /^(?=.*[A-ZА-Я])(?=.*\d).{8,40}$/;
export const REG_EXP_VALIDATE_NAME = /^[A-ZА-Я][a-zа-я-]*$/;
export const REG_EXP_VALIDATE_EMAIL = /^[\w\.-]+@[A-Za-z]+\.[A-Za-z]+$/;
export const REG_EXP_VALIDATE_PHONE = /^\+?[0-9]{10,15}$/;

export const BASE_URL = 'https://ya-praktikum.tech/api/v2';
