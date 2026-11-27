const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly fieldErrors: Record<string, string[]> = {},
  ) {
    super(message);
  }
}

let authToken: string | null = null;
let onUnauthorized: (() => void) | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export function setUnauthorizedHandler(handler: (() => void) | null) {
  onUnauthorized = handler;
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
};

function readMessage(data: unknown, status: number) {
  if (data && typeof data === 'object') {
    if ('message' in data && typeof data.message === 'string') return data.message;
    if ('error' in data && typeof data.error === 'string') return data.error;
  }
  return `Erro ${status}`;
}

function readFieldErrors(data: unknown) {
  if (data && typeof data === 'object' && 'errors' in data && data.errors) {
    return data.errors as Record<string, string[]>;
  }
  return {};
}

export async function request<T>(path: string, { method = 'GET', body }: RequestOptions = {}) {
  if (!baseUrl) {
    throw new Error('Defina EXPO_PUBLIC_API_URL no arquivo .env');
  }

  const headers: Record<string, string> = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (response.status === 204) return undefined as T;

  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    // Um 401 sem token é só senha errada no login; com token, a sessão expirou.
    if (response.status === 401 && authToken) onUnauthorized?.();
    throw new ApiError(readMessage(data, response.status), response.status, readFieldErrors(data));
  }

  return data as T;
}
