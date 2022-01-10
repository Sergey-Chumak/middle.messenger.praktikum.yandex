import { BASE_URL } from '../constants';
import { router } from '../../routing/routing';

enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Options = {
  method: string;
  data?: any;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export default class HTTPTransport {
  baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  get<T>(url: string, options: OptionsWithoutMethod = {}): Promise<T> {
    const query = queryStringify(options.data);
    const targetUrl = query ? `${url}${query}` : url;
    return this.request<T>(targetUrl, { ...options, method: Method.GET });
  }

  put<T>(url: string, options: OptionsWithoutMethod = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: Method.PUT });
  }

  post<T>(url: string, options: OptionsWithoutMethod = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: Method.POST });
  }

  delete<T>(url: string, options: OptionsWithoutMethod = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: Method.DELETE });
  }

  request<T>(url: string, options: Options = { method: Method.GET }): Promise<T> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, `${BASE_URL}${this.baseUrl}${url}`);
      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('content-type', 'application/json');
      }
      xhr.withCredentials = true;

      xhr.onload = function () {
        if (xhr.status === 200) {
          xhr.response === 'OK' ? resolve(xhr.response) : resolve(JSON.parse(xhr.response));
        } else if (xhr.status === 401) {
          reject({ error: 'Unauthorized', reason: JSON.parse(xhr.response).reason, status: 401 });
        } else if (xhr.status === 500) {
          router.go('/server-error');
        } else {
          reject(JSON.parse(xhr.response));
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === Method.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

function queryStringify(data?: {}): string {
  if (!data) return '';
  return Object.entries(data).map(([key, value]) => `${key}=${value}`)
    .reduce((acc, cur) => acc += `${cur}&`, '?')
    .slice(0, -1);
}
