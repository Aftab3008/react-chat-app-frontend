export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "/api/auth";

export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;

export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;

export const CHECK_AUTH = `${AUTH_ROUTES}/check-auth`;

export const VERIFY_EMAIL = `${AUTH_ROUTES}/verify-email`;

export const USER_INFO = `${AUTH_ROUTES}/user-info`;

export const USER_VERIFIED = `${AUTH_ROUTES}/isverified`;
